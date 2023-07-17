import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const product = new Schema(
  {
    name: { type: String, required: true },
    descriptions: { type: String, required: true },
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    tags: { type: [String], required: true },
    mainPrice: { type: String, required: true },
    discountedPrice: { type: String, required: true },
    numberOfStock: { type: String, required: true },
    pImages: [String],
  },
  { timestamps: true }
);

product.plugin(paginate);
export default model('Product', product);






