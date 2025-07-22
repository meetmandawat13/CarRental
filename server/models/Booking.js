import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const bookingSchema = new mongoose.Schema({
  car: { type: ObjectId, ref: "Car", required: true },
  user: { type: ObjectId, ref: "User", required: true },
  owner: { type: ObjectId, ref: "User", required: true },
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', "confirmed", "cancelled"], default: 'pending' },
  price: { type: Number, required: true },

  // Payment-related fields
  razorpay_order_id: { type: String },
  razorpay_payment_id: { type: String },
  razorpay_signature: { type: String }
  
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
