import Discount from "./discount.schema";
import Validation from "../../utils/Validation";
import Product from "../products/products.schema";
const validation = Validation()

/**
 * This function is used for delete product .
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns a array of object otherwise  It throw error.
 */
export const addDiscount = ({ db }) => async (req, res) => {
  const { couponId, description, mainCategory, subCategory, tags } = req.body || {};

  try {
    if (validation.isEmpty(couponId, description,mainCategory, subCategory)) return res.status(401).send('invalid Input');
    const discount = await db.create({ table: Discount, key: { couponId:couponId, description } });

    // filter  with main category ,sub category , tags
    const filter = { $and: [{ categoryId: { $in: mainCategory } }, { subCategory: { $in: subCategory } }, { tags: { $in: tags } }] };
    const update = { $push: { discountId: discount._id } };
    await Product.updateMany(filter, update);
    res.status(200).send(discount);

    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};
