import coupon from "./coupon/coupon";
import user from "./mainUser/user";
import order from "./order/order";
import product from "./products/product";
import staff from "./staff/staff";
export const services = (app) => {
  app.configure(user)
  app.configure(product);
  app.configure(order)
  app.configure(staff)
  app.configure(coupon)
};
