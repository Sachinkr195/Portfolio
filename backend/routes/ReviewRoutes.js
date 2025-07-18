import express from 'express';
import {Submit,getAllReviews,deleteReview} from '../controllers/ReviewController.js';
import { loggedin } from '../middleware/loggedin.js';

const router = express.Router();

router.post('/submit',loggedin, Submit);


router.get('/all', getAllReviews);


router.delete('/:id',loggedin, deleteReview);

export default router;
