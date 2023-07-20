import { applyCoupon, createCoupon, deleteManyCoupon, getCoupon } from "./coupon.entity";

export default function coupon() {
/**
 * POST /coupon
 * @description This route is use for creating coupon
 * @response [object ] 200 - coupon.
 */
  this.route.post('/coupon', createCoupon(this));

/**
 * GET /coupon
 * @description This route is use for get all coupon
 * @response [object] 200 - coupon.
 */

  this.route.get('/coupon', getCoupon(this));

/**
 * DELETE /coupon
 * @description This route is use for delete selected coupon
 * @response [object] 200 - delete count res
 */
  this.route.delete('/coupon/:ids', deleteManyCoupon(this));



/**
 * GET /coupon/apply/:ids
 * @description This route is use for delete selected coupon
 * @response [object] 200 - if is success It returns  products-discount-coupon info
 */
  this.route.get('/coupon/apply/:ids', applyCoupon(this));

}
