import { validation } from "../../utils/Validation";
import Chat from "./chat.schema";

/**
 * This function is used for get delete sleeted coupon
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns  delete coupon.
 */
export const createChat = ({ db }) => async (req, res) => {
  const { members } = req.body || {}

  try {
    if (!validation.checkArrayLength(members, 2)) return res.status(200).send("Must need tow array")
  const chat =  await db.create({ table: Chat, key: {...req.body} });
    res.status(200).send(chat);
  } catch (error) {
     res.status(500).send('Don"t connect with me');
  }
}
