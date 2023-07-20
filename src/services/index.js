import category from "./category/category";
import chat from "./chat/chat";
import coupon from "./coupon/coupon";
import discount from "./discount/discount";
import user from "./mainUser/user";
import message from "./message/message";
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
  app.configure(discount)
  app.configure(chat)
  app.configure(message)
};
