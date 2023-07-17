import Coupon from "./coupon.schema";

/**
 * This function is used for create new  coupon.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns coupon object.
 */

export const createCoupon =({ db }) => async (req, res) => {
  try {
      if (Object.keys(req.body)?.includes("couponUser")) return await res.status(400).send("Invalid Request");
      const coupon = await db.create({
          table: Coupon,
          key: {...req.body }
      });
      await res.status(200).send(coupon);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};


/**
 * This function is used for get all coupon
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns  all coupon.
 */
export const getCoupon =({ db }) => async (req, res) => {
  try {
      const allCoupon = await db.find({ table: Coupon, key: { paginate: true } });
      await res.status(200).send(allCoupon);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};


/**
 * This function is used for get delete sleeted coupon
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns  delete coupon.
 */
export const deleteManyCoupon =({ db }) => async (req, res) => {
  try {
    const couponsIds = req.params.ids?.split(",");
    const deleteRes = await db.removeAll( {table:Coupon,  key:{ _id: { $in: couponsIds}} });
    res.status(200).send(deleteRes);
    } catch (err) {
      res.status(500).send('Don"t connect with me');
    }
};