import React, { useState } from 'react';
import theme_pattern from '../assets/theme_pattern.svg';
import graystar from '../assets/graystar.png';
import yellow from '../assets/favorite.png';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/Appcontext';


const Review = () => {
  const { fetchReviews } = useContext(AppContext);
  
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const { isLoggedin,backendurl } = useContext(AppContext);
  
  const Reviews = {email, review , rating}

  const SubmitEvent = async (e)=>{
    if(!isLoggedin){
      alert("Please Login to post a review")
    }
    e.preventDefault();
    if(rating === 0){
      alert("please select rating")
    }
    try {
     axios.post(`${backendurl}/api/review/submit`, Reviews,{
      withCredentials: true,
     } )
      .then((res) => {
        if (res.data.success) {
          alert("Review submitted successfully");
          setRating(0);
          setEmail('');
          setReview('');
          fetchReviews();
        } else {
          alert("Failed to submit review");
        }
      })
  } catch (error) {
    alert("Something went wrong,please try again later",error)
  }

  }
  


  
  return (
    <div id='review' className="flex flex-col gap-6 px-4 py-8 text-white bg-black">
      {/* Heading */}
      <h1 className="text-3xl font-bold px-6 flex gap-2 items-center">
        Rate & Review
        <img className="w-20" src={theme_pattern} alt="" />
      </h1>

      {/* Star Rating */}
      <div className="flex items-center justify-center gap-5 py-4">
        <img onClick={() => setRating(1)} className="w-12 hover:scale-110 transition-transform cursor-pointer" src={rating >= 1 ? yellow : graystar} alt="" />
        <img onClick={() => setRating(2)} className="w-12 hover:scale-110 transition-transform cursor-pointer" src={rating >= 2 ? yellow : graystar} alt="" />
        <img onClick={() => setRating(3)} className="w-12 hover:scale-110 transition-transform cursor-pointer" src={rating >= 3 ? yellow : graystar} alt="" />
        <img onClick={() => setRating(4)} className="w-12 hover:scale-110 transition-transform cursor-pointer" src={rating >= 4 ? yellow : graystar} alt="" />
        <img onClick={() => setRating(5)} className="w-12 hover:scale-110 transition-transform cursor-pointer" src={rating === 5 ? yellow : graystar} alt="" />
      </div>

      {/* Review Form */}
      <div className="px-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-4">
          Add Review
        </h2>
        <form  className="flex flex-col gap-4 w-full max-w-md">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded  bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1">Write Review</label>
            <textarea
              placeholder="Give suggestion about my portfolio"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="4"
              required
              className="w-full p-2 rounded bg-gray-800 border border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <input type="hidden" name="rating" value={rating} />

          <button
            type="submit" onClick={SubmitEvent}
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded text-white font-medium hover:from-pink-500 hover:to-purple-500 transition"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
