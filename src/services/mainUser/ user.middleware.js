import jwt from "jsonwebtoken";
export const userAuthentication = (req, res, next) => {
  const userPassword = req.body.password;
  const userEmail = req.body.email;
  if (userPassword && userEmail) {
    const userToken = jwt.sign({ userEmail, userPassword }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
    req.password = userPassword;
    req.email = userEmail;
    req.token = userToken
    next()
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const {userEmail, userPassword} = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if ((userEmail & userPassword) !== "") {
      req.password = userPassword;
      req.email = userEmail;
      next();
    } else { next("user authentication error") }

  }
};



