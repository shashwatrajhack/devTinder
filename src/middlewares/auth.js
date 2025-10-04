const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //read the cookies from req.cookies
  try {
    const { token } = req.cookies;

    if(!token){
        throw new Error("token is invalid");
    }
    const decodedObj = await jwt.verify(token, "devTinder789");

    const { _id } = decodedObj;
    //find the user

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found!!");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};


module.exports = {
    userAuth,
}
