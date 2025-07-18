import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectdb from './config/db.js';
dotenv.config();

// Route files
import reviewRoutes from './routes/ReviewRoutes.js';
import userRoutes from './routes/AuthRoutes.js'; 

const app = express();

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cookieParser());
connectdb();

console.log(process.env.FRONTEND_URL)
app.use(cors({
  origin: `${process.env.FRONTEND_URL}`, // Replace with your frontend URL
  credentials: true
}));

// --- ROUTES ---
app.use('/api/review', reviewRoutes);
app.use('/api/user', userRoutes); // register, login, logout


app.get('/test', (req, res) => {
  res.send('API is running...');
});

// --- DATABASE CONNECTION + SERVER START ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log(`Server is running on port ${PORT}`)
})


