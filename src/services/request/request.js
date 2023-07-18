import { createRequest, deleteRequest, getAllRequest, getRequestById, updateRequest } from "./request.entity";

export default function request() {
  /**
   * POST /request
   * @description This route is use for request product
   * @response [object ] 200 - product.
   */
  this.route.post("/request", createRequest(this));

  /**
   * GET /request
   * @description This route is use for request product
   * @response [object ] 200 - product.
   */
  this.route.get("/request", getAllRequest(this));


  /**
   * GET /request/:id
   * @description This route is use for request product by id
   * @response [object ] 200 - product.
   */
  this.route.get("/request/:id", getRequestById(this));

  /**
   * PUT /request/:id
   * @description This route is use for request product by id
   * @response [object ] 200 - product.
   */
  this.route.put("/request/:id", updateRequest(this));

  /**
   * DELETE /request/:id
   * @description This route is use for delete request
   * @response [object ] 200 - product.
   */
  this.route.delete("/request/:id", deleteRequest(this));

}