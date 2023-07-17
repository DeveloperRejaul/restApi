import { addStaff, logoutAllStaff, updateStaff } from "./staff.entity";

export default function staff() {
/**
 * POST /staff
 * @description This route is used to add staff.
 * @response [object ] 200 - staff.
 */
  this.route.post('/staff', addStaff(this));

/**
 * POST /staff/logoutAll
 * @description This route is used to add staff.
 * @response [object ] 200 - staff.
 */
  this.route.delete('/staff/logoutAll/:id', logoutAllStaff(this));

/**
 * POST /staff/update
 * @description This route is used to add staff.
 * @response [object ] 200 - staff.
 */
  this.route.patch('/staff/update/:id', updateStaff(this));
}