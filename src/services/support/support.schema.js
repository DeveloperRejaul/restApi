import mongoose, { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const Support = new Schema(
  {
    supportUser: {type: mongoose.Types.ObjectId, ref:"Staff", required:true}
  },
  { timestamps: true }
);

Support.plugin(paginate);
export default model('Support', Support);
