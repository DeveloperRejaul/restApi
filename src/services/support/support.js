import { addSupportStaff } from "./support.entity";

export default function support() {
/**
 * POST /support
 * @description This route is used to add support.
 * @response [object ] 200 - support.
 */
  this.route.post('/support', addSupportStaff(this));

}