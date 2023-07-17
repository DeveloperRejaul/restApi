import mongoose, { Schema, model } from "mongoose";
import paginate  from "mongoose-paginate-v2";

const request = new Schema({
  orderID: {
    type: String,
    required: true,
    unique: true,
    default: generateRequestID,
  },
  name: { type: String, required: true },
  link: { type: String, required: true },
  quantity: { type: String, required: true },
  note: { type: String },
  status: { type: String, default: "pending", enum: ["pending", "abandoned", "closed", "estimate sent"] },
  shippingAddress: { type: String },
  billingAddress: { type: String },
  trnxId: { type: String },
  sellerTakes: { type: String },
  usSellerTakes: { type: String },
  packersFee:{type: String },
  user:{type:mongoose.Types.ObjectId , ref:"User", required:true}
},{ timestamps: true });

request.plugin(paginate);
export default model("Request", request);


function generateRequestID() {
  const counter = Math.floor(Math.random() * 9000) + 1000;
  return `#${counter}`;
};


