import mongoose, { Schema, model } from "mongoose";
import paginate  from "mongoose-paginate-v2";

const Order = new Schema({
  orderID: {
    type: String,
    required: true,
    unique: true,
    default: generateOrderID,
  },
  name: { type: String, required: true },
  link: { type: String, required: true },
  quantity: { type: String, required: true },
  note: { type: String },
  date: { type: Date, default: Date.now },
  status :{ type:String , default:"pending" , enum: [ "abandoned", "estimate send","closed" , "pending" ]},
  user:{type: mongoose.Types.ObjectId, ref: "User" , required:true},
},{ timestamps: true });

Order.plugin(paginate)
export default model("Order", Order);

function generateOrderID() {
  const counter = Math.floor(Math.random() * 9000) + 1000;
  return `#${counter}`;
}