import express from 'express';
import {
  changebookingStatus,
  checkAvailabilityOfCar,
  createBooking,
  getOwnerBookings,
  getUserBookings
} from '../controllers/bookingController.js';
import { verifyPayment } from '../controllers/paymentController.js'; // ✅ added
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityOfCar);
bookingRouter.post('/create', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/owner', protect, getOwnerBookings);
bookingRouter.post('/change-status', protect, changebookingStatus);
bookingRouter.post('/verify-payment', protect, verifyPayment); // ✅ added this

export default bookingRouter;
