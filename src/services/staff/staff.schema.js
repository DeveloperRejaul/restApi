import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const Staff = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true ,unique: true},
    phoneNumber: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "supper admin", "support"] },
    access: { type: String, required: true, enum: ["full", "limited", "support"] },
    supportType:{type:[String]}
  },
  { timestamps: true }
);

Staff.plugin(paginate);
export default model('Staff', Staff);
