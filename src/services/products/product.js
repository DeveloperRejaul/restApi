import {addDiscount, deleteProductById,editProductById,getAllProduct,getProductById,productPost} from './product.entity';
// const upload = multer({ dest: 'uploads/' })

export default function product() {
  /**
   * POST /product
   * @description This route is used to post product.
   * @response [object ] 200 - products.
   */
  this.route.post('/product', productPost(this));

  /**
   * GET /product
   * @description This route is used to Get all product.
   * @response [array   of object ] 200 -  products array.
   */
  this.route.get('/products', getAllProduct(this));

  /**
   * GET /product by id
   * @description This route is used to Get single product.
   * @response [object] 200 -  Its return  single product .
   */
  this.route.get('/product/:id', getProductById(this));

  /**
   * PUT /product by id
   * @description This route is used to Get single product.
   * @response [object] 200 -  Its return  single edited product .
   */
  this.route.put('/product/:id', editProductById(this));

  /**
   * DELETE /product by id
   * @description This route is used to Get single product.
   * @response [object] 200 -  Its return product isDelete .
   */
  this.route.delete('/product/:id', deleteProductById(this));

  /**
   * DELETE /product by id
   * @description This route is used to Get single product.
   * @response [object] 200 -  Its return product isDelete .
   */
  this.route.put('/product/:id', addDiscount(this));
}
