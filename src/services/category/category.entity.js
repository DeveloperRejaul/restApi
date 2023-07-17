import Validation from "../../utils/Validation";
import Product from "../products/products.schema";
import Category from "./category.schema";

/**
 * This function is used for add category
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns category
 */
export const createCategory = ({ db }) => async (req, res) => {

  const { name, slug } = req.body || {}
  try {

    if (Validation().isEmpty(name)) return await  res.status(401).send("Input Error")
    if (Validation().isEmpty(slug)) return await  res.status(401).send("Input Error")

      const category = await db.create({
          table: Category,
          key: { name, slug}
      });
      await res.status(200).send(category);

    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};


/**
 * This function is used for get all category list
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns category list
 */
export const getCategory = ({ db }) => async (req, res) => {

  try {
    const category = await db.find({ table: Category, key: { paginate: false ,populate: { path: 'productId', select: 'name descriptions'}} });
    res.status(200).send(category);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};

/**
 * This function is used for delete selected category list
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns delete count response
 */
export const deleteManyCategory = ({ db }) => async (req, res) => {
  try {
    const categoryIds = req.params.ids?.split(',')
    const deleteRes = await db.removeAll( {table:Category,  key:{ _id: { $in: categoryIds}} });
    res.status(200).send(deleteRes);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};





