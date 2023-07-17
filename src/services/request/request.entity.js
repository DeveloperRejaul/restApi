import RequestItems from "./request.schema";
import validation from "../../utils/Validation";
import { updateMany } from "../../controllers/operations";
const requestAllow = new Set(['name', 'link', 'quantity', 'user']);
const checkInput = validation()

/**
 * This function is used for create request
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns Its return request object.
 */
export const createRequest  = ({ db }) => async (req, res) => {
  const {name, link , quantity , user } = req.body || {}
  try {
    if (checkInput.isEmpty(name, link , quantity , user)) return await res.status(404).send("Invalid Input")
    const request =  await db.create({
        table: RequestItems,
        key: { name, link , quantity,user},
    });
    await db.save(request);
     res.status(200).send(request);

    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};


/**
 * This function is used for get all request
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns Its return request object.
 */
export const getAllRequest  = ({ db }) => async (req, res) => {
  try {
    const request = await db.find({ table: RequestItems, key: { paginate: true} });
     res.status(200).send(request);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};


/**
 * This function is used for get request by id
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns Its return request object.
 */
export const getRequestById  = ({ db }) => async (req, res) => {
  const reqId = req.params?.id;
  try {
    const result = await db.findOne({ table: RequestItems, key: { _id: reqId ,populate: { path: 'user', select: '-password -tramsAndCondition'  } } });
     res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};


/**
 * This function is used for update request
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns Its return request object.
 */
export const updateRequest  = ({ db }) => async (req, res) => {
  const updateId = req.params?.id;
  try {
    const updatedRequest =  await db.update({ table: RequestItems, key: { id: updateId, body: { ...req.body } } });
     res.status(200).send(updatedRequest );
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};


/**
 * This function is used for delete request
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns Its return request object.
 */
export const deleteRequest  = ({ db }) => async (req, res) => {
  const id = req.params?.id;
  try {
      const result = await db.remove({ table: RequestItems, key: {_id: id } });
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};

