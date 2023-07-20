import Order from "./order.schema";
import validation from "../../utils/Validation";
import RequestItems from "../request/request.schema";
import User from "../mainUser/user.schema";
const checkInput = validation()


/**
 * This function is used for send invoice or create order.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns Its return oder object.
 */
export const sendInvoice = ({ db }) => async (req, res) => {

  const {  requestId, userId } = req.body || {};
  try {
    if (checkInput.isEmpty(requestId,userId)) return await res.status(404).send("Invalid Input");
    const result = await db.create({ table: Order, key: { requestId, userId } });
    await db.save(result);
    await User.updateOne({ _id: userId }, { $push: { orderId: result._id } });
    res.status(200).send(result);

    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};


/**
 * This function is used for get all order.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns Its return oder object.
 */

export const getAllOrders = ({ db }) => async (req, res) => {
  try {
    const result =  await db.find({table: Order,key: {  paginate: true , populate: { path: 'requestId userId'}}});
    res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};


/**
 * This function is used for get order by id.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns Its return oder object.
 */
export const getOrderById = ({ db }) => async (req, res) => {
  const id = req.params?.id
  try {
    const result = await db.findOne({ table: Order, key: { id , populate: { path: 'requestId userId'}} });
    res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};


/**
 * This function is used for delete order.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns Its return oder object.
 */
export const deleteOrder = ({ db }) => async (req, res) => {
  const id = req.params?.id
  try {
    const result = await db.remove({ table: Order, key: { _id: id } });
    await User.updateOne({ _id: result?.userId }, { $pull: { orderId: id } })

    res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};


/**
 * This function is used for update order.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns Its return oder object.
 */
export const updateOrder = ({ db }) => async (req, res) => {
  const id = req.params?.id
  const { order, request, user } = req.body || {}

  try {
    const  updatedOrder = await db.update({ table: Order, key: { id, body: { ...order } } });
    const updatedRequest = await db.update({ table: RequestItems, key: { id: request.id, body: { ...request} } });
    const updatedUser = await db.update({ table: User, key: { id: user.id, body: { ...user} } });
    res.status(200).send({...updatedOrder, ...updatedRequest, ...updatedUser})
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};


/**
 * This function is used for get orders by user id.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns Its return oder object.
 */
export const getOrdersByUserId = ({ db }) => async (req, res) => {
  const id = req.params?.id
  try {
    const result = await db.find({ table: Order, key: { userId:id , populate: { path: 'requestId userId'}} });
    res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};
