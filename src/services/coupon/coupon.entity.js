/**
 * This function is used for create new  user.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns user object.
 */
export const createCoupon =({ db }) => async (req, res) => {
    try {

    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
  };
