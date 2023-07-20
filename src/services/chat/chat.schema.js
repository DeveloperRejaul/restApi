import mongoose, { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const Chat = new Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }, { type: mongoose.Schema.Types.ObjectId, ref: "Support" }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }]
  },
  { timestamps: true }
);

Chat.plugin(paginate);
export default model('Chat', Chat);


