import mongoose, { Schema, model } from "mongoose";
import paginate  from "mongoose-paginate-v2";

const Order = new Schema({
  items: { type: String, required: true , default:"1"},
  date: { type: Date, default: Date.now },
  status: { type: String, default: "processing", enum: ["pending", "processing", "completed", "shipping", "cancel", "paid"] },
  paymentStatus:{type:String ,default: "pending", enum: ["pending", "complete", "refunded", "cenacle"]},
  requestId: { type: mongoose.Types.ObjectId, ref: "Request", required: true },
  userId:{ type: mongoose.Types.ObjectId, ref: "User", required: true },
},{ timestamps: true });

Order.plugin(paginate)
export default model("Order", Order);
