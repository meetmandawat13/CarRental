import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
import Booking from "../models/Booking.js";

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  const { amount } = req.body;

  console.log("🧾 Amount received from frontend:", amount);

  const options = {
    amount: amount,
    currency: 'INR',
    receipt: `rcptid_${Date.now()}`,
  };

  try {
    const order = await instance.orders.create(options);
    console.log("✅ Razorpay Order Created:", order);
    res.status(200).json({ success: true, order });

  } catch (err) {
    console.error("❌ Error creating Razorpay order:", err);
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingDetails } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    try {
      // ✅ Save booking to MongoDB
      const newBooking = new Booking({
        ...bookingDetails,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        status: "confirmed"
      });

      await newBooking.save();

      res.json({ success: true, message: 'Payment verified and booking confirmed' });

    } catch (err) {
      console.error("❌ Error saving booking to DB:", err);
      res.status(500).json({ success: false, message: 'Payment verified, but failed to store booking', error: err.message });
    }

  } else {
    res.status(400).json({ success: false, message: 'Invalid payment signature' });
  }
};

console.log("KEY_ID", process.env.RAZORPAY_KEY_ID);
console.log("KEY_SECRET", process.env.RAZORPAY_KEY_SECRET);
