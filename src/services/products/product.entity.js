import Product from './products.schema';
import Category from '../category/category.schema';

/**
 * This function is used for create product.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if  is  success  It returns a object created single product otherwise  IT throw error  .
 */

export const productPost = ({ db, imageUp }) => async (req, res) => {

  try {
    const validObj = Object.keys(req.body).every((d) => req.body[d] !== '' && req.body[d] !== null) || Object.keys(req.body.data).every((d) => req.body.data[d] !== '' && req.body.data[d] !== null);
    if (!validObj) res.status(400).send(' wrong request');
    if (req.body?.data) req.body = JSON.parse(req.body?.data || '{}');
    if (req.files?.pImages) {
      for (const m of req.files.pImages) {
        const images = await imageUp(m.path);
        req.body.pImages = [...(req.body.pImages || []), images];
      }
    }
    const categoryId = req.body?.categoryId;
    const product = await db.create({
          table: Product,
          key: { ...req.body},
    });
    await Category.updateOne({ _id: categoryId }, { $push: { productId: product._id } });
    await res.status(200).send(product);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
  };

/**
 * This function is used for get all products .
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns a array of object otherwise  IT throw error.
 */
export const getAllProduct =({ db }) => async (req, res) => {
    try {
      const products = await db.find({
        table: Product,
        key: { paginate: true, populate: { path: 'categoryId', select: 'name slug'} },
      });

      await res.status(200).send(products);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
  };

/**
 * This function is used for get  single product   by id .
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns object ,  otherwise it throw error.
 */
export const getProductById =({ db }) => async (req, res) => {
    try {
      const product = await db.findOne({
        table: Product,
        key: { paginate: true, id: req.params.id },
      });
      await res.status(200).send(product);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
  };



/**
 * This function is used for edit product.
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns a  object otherwise  It throw error.
 */

export const editProductById = ({ db }) => async (req, res) => {
    try {
      const product = await db.update({
        table: Product,
        key: { id: req.params.id, body: { ...req.body } },
      });
      await res.status(200).send(product);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
  };


/**
 * This function is used for delete product .
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns a array of object otherwise  It throw error.
 */
export const deleteProductById =({ db }) =>async (req, res) => {
    const id = req.params?.id;
    try {
      const removedProduct = await db.remove({ table: Product, key: { id } });
      await res.status(200).send(removedProduct);
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};

/**
 * This function is used for delete product .
 * @param {Object} req This is the request object.
 * @param {Object} res this is the response object
 * @returns if is success It returns a array of object otherwise  It throw error.
 */
export const addDiscount = ({ db }) => async (req, res) => {
  try {
    const {mainCategory} = req.body
    } catch (err) {
      console.log(err);
      res.status(500).send('Don"t connect with me');
    }
};
