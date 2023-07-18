import { deleteOrder, getAllOrders, getOrderById, getOrdersByUserId, sendInvoice, updateOrder } from "./order.entity";

export default function order() {

  /**
   * POST / order
   * @description This route is used to send  Invoice.
   * @response [object ] 200 - orders.
   */
  this.route.post("/order", sendInvoice(this));

  /**
   * GET / order
   * @description This route is used get all orders.
   * @response [object ] 200 - orders.
   */
  this.route.get("/orders", getAllOrders(this));


  /**
   * GET / order
   * @description This route is used to get single order by id.
   * @response [object ] 200 - orders.
   */
  this.route.get("/order/:id", getOrderById(this));

  /**
   * GET / orders
   * @description This route is used to get single order by id.
   * @response [object ] 200 - orders.
   */
  this.route.get("/orders/:id", getOrdersByUserId(this));


  /**
   * DELETE / order
   * @description This route is used to get single order by id.
   * @response [object ] 200 - orders.
   */
  this.route.delete("/order/:id", deleteOrder(this));


   /**
   * PUT / order
   * @description This route is used to get single order by id.
   * @response [object ] 200 - orders.
   */
  this.route.put("/order/:id", updateOrder(this));



}
