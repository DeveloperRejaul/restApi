import mongoose, { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const Message = new Schema(
  {
    text: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    chat: {type: mongoose.Schema.Types.ObjectId,ref: "Chat",required: true}
  },
  { timestamps: true }
);

Message.plugin(paginate);
export default model('Message', Message);



