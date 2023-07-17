import { userAuthentication } from './ user.middleware';
import { loginUser, recoverAccount, signUpUser } from './user.entity';

export default function user() {
  /**
   * POST /user
   * @description This route is use for signup user
   * @response [object ] 200 - user.
   */
  this.route.post('/user', signUpUser(this));

  /**
   * POST /user/login
   * @description This route is use for login user
   * @response [object ] 200 - user.
   */
  this.route.post('/user/login',userAuthentication,  loginUser(this));

  /**
   * POST /user/recover
   * @description This route is use for recover  user account
   * @response [object ] 200 - user.
   */
  this.route.post('/user/recover', recoverAccount(this));
}
