import { userAuthentication } from './ user.middleware';
import { getAllCustomer, loginUser, recoverAccount, setNewPass, signUpUser, verifyOtp } from './user.entity';

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
   * @description This route is use for recover user account
   * @response [object ] 200 - token.
   */
  this.route.post('/user/recover', recoverAccount(this));

   /**
   * POST /user/recover/otp
   * @description This route is use for recover  user account , verify otp
   * @response [object ] 200 - token.
   */
  this.route.post('/user/recover/otp', verifyOtp(this));


  /**
   * PUT /user/recover/pass
   * @description This route is use for recover  user account , set new password
   * @response [object ] 200 - token.
   */
  this.route.put('/user/recover/pass', setNewPass(this));


  /**
   * GET /user/customer
   * @description This route is use for get all customer
   * @response [object ] 200 - token.
   */
  this.route.get('/user/customer', getAllCustomer(this));

}
