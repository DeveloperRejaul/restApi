import Validation from '../../utils/Validation'
import Support from '../support/support.schema';
import Staff from './staff.schema';
const validation = Validation()

/**
 * This function is used for create staff.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if  is  success  It returns a object created single staff info  .
 */
export const addStaff =({ db }) =>async (req, res) => {
  const { email, phoneNumber, role } = req.body || {}
  const existSupportStaff = role === 'support';

  try {
    if(!validation.objKeysLength(req.body, 6)) return res.status(400).send('invalid request');
    if(!validation.isEmail(email)) return res.status(400).send('invalid email');
    if (!validation.isPhoneNumber(phoneNumber)) return res.status(400).send('invalid phone number');
    const staff = await db.create({ table: Staff, key: { ...req.body } });
    await db.save(staff);

    // add support staff hear
    if (existSupportStaff) {
       const supportStaff = await db.create({ table: Support, key: {supportUser:staff._id} });
       await db.save(supportStaff);
    }

    res.status(200).send(staff)
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
  };

/**
 * This function is used for logout all staff.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if  is  success  It returns all staff logout information.
*/
export const logoutAllStaff =({ db }) =>async (req, res) => {
  const id = req.params.id
  try {
    const res = await db.removeAll({ table: Staff, key: { _id: { $ne: id } } })
    res.status(200).send(res)
  } catch (error) {
    res.status(404).send(`can't delete user : ${error.message}`)
  }
};

/**
 * This function is used for update staff.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if  is  success  It returns update single staff.
*/
export const updateStaff = ({ db }) => async (req, res) => {
  const id = req.params.id
  const { email, phoneNumber } = req.body || {}
  try {
    if(!Validation().isEmail(email)) return res.status(400).send('invalid email');
    if(!Validation().isPhoneNumber(phoneNumber)) return res.status(400).send('invalid phone number');
    const staff = await db.update({ table: Staff, key: { id: id , body: {...req.body }} });
    res.status(200).send(staff)
  } catch (error) {
    res.status(404).send(`can't update user : ${error.message}`)
  }

};

