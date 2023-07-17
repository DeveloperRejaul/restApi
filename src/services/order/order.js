import { getAllOrder, orderPost } from "./order.entity";


export default function order() {
  /**
   * POST / order
   * @description This route is used to post order || create order.
   * @response [object ] 200 - order.
   */
  this.route.post("/order", orderPost(this));


  /**
   * POST / order
   * @description This route is used to post order || create order.
   * @response [object ] 200 - orders.
   */
  this.route.get("/orders", getAllOrder(this));

}
