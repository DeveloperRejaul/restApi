import Order from "./order.schema";

/**
 * This function is used for creating oder
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns Its return oder object.
 */
export const orderPost  = ({ db }) => async (req, res) => {
  try {
     const order =  await db.create({
        table: Order,
        key: { ...req.body},
    });
    await db.save(order);
    await res.status(200).send(order);

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
export const getAllOrder  = ({ db }) => async (req, res) => {
  try {
    const orders = await db.find({ table: Order, key: { paginate: true, populate: { path: 'user', select: 'name -_id'} } });
    await res.status(200).send(orders);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};
