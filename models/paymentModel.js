import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const paymentSchema = new mongoose.Schema({
  userId: { type: String },
  items: [itemSchema],
  dateTime: { type: Date, default: new Date() },
});

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;
