import { createCategory, deleteManyCategory, getCategory } from "./category.entity";

export default function Category() {


/**
 * POST /category
 * @description This route is use for creating category
 * @response [object ] 200 - category.
 */
  this.route.post('/category', createCategory(this));


/**
 * GET /category
 * @description This route is use for creating category
 * @response [object ] 200 - category.
 */
  this.route.get('/category', getCategory(this));

/**
 * DELETE /category
 * @description This route is use for delete category
 * @response [object ] 200 - category.
 */
  this.route.delete('/category/:ids', deleteManyCategory(this));


 }