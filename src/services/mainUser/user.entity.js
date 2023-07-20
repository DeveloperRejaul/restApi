import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateOTP } from '../../utils/utilsFun';
import Validation from '../../utils/Validation';
import User from './user.schema';

const userSignUpAllow = new Set(['name','email','phoneNumber','password','tramsAndCondition']);

/**
 * This function is used for create new  user.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns user object.
 */
export const signUpUser = ({ db }) => async (req, res) => {
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
export const recoverAccount =({ db, settings, mail }) => async (req, res) => {
    try {
      if (Object.keys(req.body).length !== 1) return res.status(200).send('invalid input');
      const phoneNumber = req.body?.phoneNumber;
      const email = req.body?.email;

      let  user= null
      if (email !== undefined) user = await db.findOne({ table: User, key: { email } });
      if (phoneNumber !== undefined) user = await db.findOne({ table: User, key: { phoneNumber } });
      if (user === null) return await res.status(401).send('unauthorized input');

      const otp = generateOTP()
      await mail({
        receiver: email,
        subject: "Your account verification code",
        body: otp,
        type: "text"
      });
      const token = await jwt.sign({ date: Date.now(), otp, email }, settings.OTP_VERIFICATION_SECRET);
      res.status(200).send({token})
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};


/**
 * This function is used for verify otp .
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns user object.
 */
export const verifyOtp = ({settings }) => async (req, res) => {
  const { otp: tokenOtp, token } = req.body || {};
  const currentTime = Date.now();

  try {
    const { date:prevuesTime, otp } = jwt.verify(token, settings.OTP_VERIFICATION_SECRET) || {};
    const timeDifference = Math.floor((currentTime - prevuesTime) / 1000);
    const waitingTime = 60

    if (tokenOtp === otp && timeDifference <= waitingTime) return await res.status(200).send({token})
    res.status(401).send("expire time")

  } catch (error) {
    console.log(err);
      res.status(500).send('Don"t connect with me');
  }
};


/**
 * This function is used for set new password.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns updated user object.
 */
export const setNewPass = ({ db , settings}) => async (req, res) => {
  let {token, password } = req.body || {};
  const currentTime = Date.now();

  try {
    const { date:prevuesTime, email } = jwt.verify(token, settings.OTP_VERIFICATION_SECRET) || {};
    const timeDifference = Math.floor((currentTime - prevuesTime) / 1000);
    const waitingTime = 60 * 5;

    if (timeDifference <= waitingTime) {
      password = await bcrypt.hash(password, 8);
      const result =  await db.update({ table: User, key: { email, body: {password} } });
      res.status(200).send(result);
    } else {
      res.status(401).send("expire time");
    };

  } catch (error) {
    console.log(err);
      res.status(500).send('Don"t connect with me');
  }
};


/**
 * This function is used for get all customer.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns all of customer if oder id exists.
 */
export const getAllCustomer = ({ db }) => async (req, res) => {
  try {
    const result = await db.find({ table: User, key: { orderId: { $exists: true,$ne: [] } } });
    res.status(200).send(result)

  } catch (err) {
    console.log(err);
      res.status(500).send('Don"t connect with me');
  }
};


/**
 * This function is used for add new  customer.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns new  customer.
 */
export const addNewCustomer = ({ db }) => async (req, res) => {
  const { firstName, lastName, email, phoneNumber, altNumber, address,city, zipCode  } = req.body || {}
  const password = await bcrypt.hash("1234", 8);
  try {

    if (Validation().isEmpty(firstName,email,phoneNumber,address,city, zipCode )) return res.status(400).send('invalid input');
    if (!Validation().isEmail(email)) return res.status(400).send('invalid email');
    const name = `${firstName} ${lastName}`;
    const newAddress = `${address}, ${city}, ${zipCode}`

    const customer = await db.create({
        table: User,
        key: { name, email, phoneNumber, altNumber,  address:newAddress, password, tramsAndCondition: true}
    });
    await res.status(200).send(customer );
  } catch (err) {
    console.log(err);
    res.status(500).send('Don"t connect with me');
  }
};


/**
 * This function is used for add new  customer.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns new  customer.
 */
export const getSingleCustomer = ({ db }) => async (req, res) => {

  try {
   // inner populate
    const customer = await User.findOne({ _id: req.params.id }).populate({ path: 'orderId', populate: { path: 'requestId',  model: 'Request'} })
    res.status(200).send(customer)
  } catch (err) {
    console.log(err);
    res.status(500).send('Don"t connect with me');
  }
};


