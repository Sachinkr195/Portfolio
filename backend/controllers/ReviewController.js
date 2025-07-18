import dotenv from 'dotenv';
dotenv.config();

import reviewModel from '../models/ratingreview.js';
import userModel from '../models/User.js';
import jwt from 'jsonwebtoken';

// Get user from token (assumes token is always present)
const getUserFromToken = async (req) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return await userModel.findById(decoded.id);
};

// Submit or update a review
export const Submit = async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    const { review, rating,email } = req.body;

    if (!review || !rating) {
      return res.status(400).json({ success: false, message: "Review and rating are required" });
    }

    // If review already exists by this user, update it
    const existingReview = await reviewModel.findOne({ user: user._id });

    if (existingReview) {
      existingReview.review = review;
      existingReview.rating = rating;
      await existingReview.save();

      return res.json({ success: true, message: "Review updated", review: existingReview });
    }

    // Create new review
    const newReview = await reviewModel.create({
      user: user._id,
      review,
      rating,
      email
    });

    return res.json({ success: true, message: "Review submitted", review: newReview });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find().populate('user', 'email isAdmin');
    return res.json({ success: true, reviews });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    const reviewId = req.params.id;

    if (!user || !user._id) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const review = await reviewModel.findById(reviewId);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    if (!review.user) {
      return res.status(400).json({ success: false, message: "Review has no user attached" });
    }

    
    console.log("Logged-in user:", user._id.toString());
    console.log("Review owner:", review.user.toString());


    if (
      review.user.toString() !== user._id.toString() &&
      !user.isAdmin
    ) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this review" });
    }

    await review.deleteOne();
    return res.json({ success: true, message: "Review deleted" });

  } catch (error) {
    console.error("Delete Review Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

