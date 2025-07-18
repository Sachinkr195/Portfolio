
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
    },
    
    email:{
        type: String,
        required: true,
        unique: true
    },
    rating:{
        type: Number,
        required: true
    },
    review:{
        type: String,
        default: true
    }

})


const reviewModel = mongoose.models.user || mongoose.model('review', reviewSchema);
export default reviewModel;