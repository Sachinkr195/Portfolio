import dotenv from 'dotenv';
dotenv.config();
import userModel from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

// Register User
export const register = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            email,
            name,
            password: hashedPassword,
            isAdmin: isAdmin || false
        });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, message: "User registered successfully", isAdmin: user.isAdmin });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, message: "Login successful", isAdmin: user.isAdmin });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Logout User
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Logged out successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Check if Authenticated
export const isAuthenticated = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, isAdmin: user.isAdmin });

    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
