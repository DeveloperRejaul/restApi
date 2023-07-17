import category from "./category/category";
import coupon from "./coupon/coupon";
import user from "./mainUser/user";
import order from "./order/order";
import product from "./products/product";
import request from "./request/request";
import staff from "./staff/staff";
import support from "./support/support";

export const services = (app) => {
  app.configure(user)
  app.configure(product);
  app.configure(order)
  app.configure(staff)
  app.configure(coupon)
  app.configure(support)
  app.configure(category)
  app.configure(request)
};
