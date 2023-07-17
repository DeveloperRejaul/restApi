import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const user = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tramsAndCondition: { type: Boolean, required: true },
  },
  { timestamps: true }
);

user.plugin(paginate);
export default model('User', user);
