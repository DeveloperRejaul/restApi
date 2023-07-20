import { addDiscount } from "./discount.entity";


export default function discount() {
/**
 * POST /discount
 * @description This route is use for create discount
 * @response [object ] 200 - discount.
 */
  this.route.post('/discount', addDiscount(this));



 }