import mongoose, { Schema, model } from "mongoose";
import paginate  from "mongoose-paginate-v2";

const Order = new Schema({
  orderID: {
    type: String,
    required: true,
    unique: true,
    default: generateOrderID,
  },
  items: { type: String, required: true , default:"1"},
  date: { type: Date, default: Date.now },
  status: { type: String, default: "processing", enum: ["pending", "processing", "completed", "shipping", "cancel", "paid"] },
  requestId: { type: mongoose.Types.ObjectId, ref: "Request", required: true },
  userId:{ type: mongoose.Types.ObjectId, ref: "User", required: true },
},{ timestamps: true });

Order.plugin(paginate)
export default model("Order", Order);

function generateOrderID() {
  const counter = Math.floor(Math.random() * 9000) + 1000;
  return `#${counter}`;
}