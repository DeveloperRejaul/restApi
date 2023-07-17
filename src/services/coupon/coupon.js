import { createCoupon } from "./coupon.entity";

export default function coupon() {
  /**
 * POST /coupon
 * @description This route is use for creating coupon
 * @response [object ] 200 - coupon.
 */
  this.route.post('/coupon', createCoupon(this));


}
