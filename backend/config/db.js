import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectdb = async()=>{
    try {
     await mongoose.connect(process.env.MONGODB_URI)
     console.log("connected to db")
    } catch (error) {
       console.log("MongoDb connection failed",error) 
    }
}

export default connectdb;
