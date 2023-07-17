import mongoose, { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const Coupon = new Schema(
  {
    couponName: { type: String , required:true, unique: true},
    couponType: { type: String, required:true, enum: ["fix", "percentage"]},
    couponAmount: { type: String ,required:true},
    couponUseLimit: { type: String , required:true},
    expireDate: { type: String, required: true },
    couponUser:[{type: mongoose.Types.ObjectId, ref: "User"}]
  },
  { timestamps: true }
);

Coupon.plugin(paginate);
export default model('Coupon', Coupon);
