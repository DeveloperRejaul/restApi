import { createChat } from "./chat.entity";

export default function chat() {

  /**
   * POST/chat
   * @description This route is use for get  single  customer
   * @response [object ] 200 - token.
  */
  this.route.post('/chat', createChat(this));


}