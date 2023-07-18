import mongoose, { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const user = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    altNumber:{type:String},
    password: { type: String, required: true },
    tramsAndCondition: { type: Boolean, required: true },
    address: {type:String},
    amountSpent: { type: String, default: "0" },
    shippingAddress: { type: String },
    billingAddress: { type: String },
    country: { type: String },
    orderId:[{type:mongoose.Types.ObjectId , ref:"Order"}]
  },
  { timestamps: true }
);

user.plugin(paginate);
export default model('User', user);
