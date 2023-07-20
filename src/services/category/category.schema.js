import mongoose, { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const Category = new Schema(
  {
    name:{type:String, required:true},
    slug: { type: String, required: true },
    productId: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    discountId:[{type:mongoose.Types.ObjectId, ref:"Discount"}]
  },
  { timestamps: true }
);

Category.plugin(paginate);
export default model('Category', Category);
