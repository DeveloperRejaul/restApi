import mongoose, { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const product = new Schema(
  {
    name: { type: String, required: true },
    descriptions: { type: String, required: true },
    mainPrice: { type: String, required: true },
    discountedPrice: { type: String, required: true },
    numberOfStock: { type: String, required: true },
    pImages: [String],
    discountId:[{type: mongoose.Types.ObjectId, ref: "Discount"}],
    categoryId: { type: mongoose.Types.ObjectId, required: true, ref: "Category" },
    subCategory:[{type:mongoose.Types.ObjectId, ref:"Category"}],
    tags: {type: [String], required: true },
  },
  { timestamps: true }
);

product.plugin(paginate);
export default model('Product', product);






