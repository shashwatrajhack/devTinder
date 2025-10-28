const express = require("express");

const connectionRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

connectionRouter.post("/sendConnectionRequest",userAuth,(req,res) => {
  const user = req.user;
 
  res.send(user.firstName + " Sent connection request");
})

module.exports = connectionRouter;