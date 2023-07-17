import mongoose, { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const Discount = new Schema(
  {
    couponId: { type: mongoose.Types.ObjectId, ref: "Coupon"},
    description: {type:String },
    main: {type:String },
  },
  { timestamps: true }
);

Discount.plugin(paginate);
export default model('Discount', Discount);
