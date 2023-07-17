import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const Coupon = new Schema(
  {
    user:[{type: mongoose.Types.ObjectId, ref: "User"}],
    couponName: { type: String },
    couponType: { type: String, enum: ["fix", "percentage"]},
    couponAmount: { type: String },
    couponUseLimit: { type: String },
    expireDate: { type: String }
  },
  { timestamps: true }
);

Coupon.plugin(paginate);
export default model('Coupon', Coupon);
