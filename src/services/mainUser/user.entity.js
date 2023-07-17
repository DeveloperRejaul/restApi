import bcrypt from 'bcrypt';
import Validation from '../../utils/Validation';
import User from './user.schema';

const userSignUpAllow = new Set(['name','email','phoneNumber','password','tramsAndCondition']);

/**
 * This function is used for create new  user.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns user object.
 */
export const signUpUser =({ db }) => async (req, res) => {
    try {
      let { name, email, password, phoneNumber, tramsAndCondition } = req.body || {};
      const chalkedUserInfo = Object.keys(req.body).every((d) => userSignUpAllow.has(d));

      if (!chalkedUserInfo) return res.status(400).send('invalid request');
      if (!Validation().isEmail(email)) return res.status(400).send('invalid email');
      if (!tramsAndCondition) return res.status(400).send('need must agree our trams and condition');

      password = await bcrypt.hash(password, 8);
      const user = await db.create({
        table: User,
        key: { name, email, password, phoneNumber, tramsAndCondition }
      });
      await res.status(200).send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
  };

/**
 * This function is used for login user.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns user object.
 */
export const loginUser = ({ db }) => async (req, res) => {
  const { password, email, token } = req;

  try {
    if (!Validation().isEmail(email)) return res.status(400).send('invalid email');
    const findUser = await db.findOne({ table: User, key: { email } });
    const validPass = await bcrypt.compare(password, findUser.password);
    if (validPass && token) return await res.status(200).send({ ...findUser, token });
    if (validPass && (token === undefined)) return await res.status(200).send(findUser);

    res.status(401).send('invalid password');
  } catch (err) {
    console.log(err);
    res.status(500).send('Don"t connect with me');
  }
};

/**
 * This function is used for recover user account.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns user object.
 */
export const recoverAccount =({ db }) => async (req, res) => {
    try {
      if (Object.keys(req.body).length !== 1) return res.status(200).send('invalid input');
      const phoneNumber = req.body?.phoneNumber;
      const email = req.body?.email;
      const isEmail = email !== null;

      let user = null;
      if (isEmail) user = await db.findOne({ table: User, key: { email } });
      if (!isEmail) user = await db.findOne({ table: User, key: { phoneNumber } });
      if (user === null)
        return await res.status(401).send('unauthorized input');
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};
