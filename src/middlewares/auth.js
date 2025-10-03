const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async(req,res,next) => {
    const {token} = req.cookies;
    const decodedObj =await jwt.verify(token,"devTinder789");

    const {_id} = decodedObj;

    const user = await User.findById(_id);


}