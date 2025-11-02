const express = require("express");

const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async(req, res) => {
    try {
      const toUserId = req.params.toUserId;
      const fromUserId = req.user._id;
      const status = req.params.status;

      const allowedStatus = ["interested","ignored"];
      if(!allowedStatus.includes(status)){
        return res.status(400).send(`${status} not valid`);
      };

      const userExist =await User.findById(toUserId);

      if(!userExist){
        return res.status(400).send({message:"User does not exist"})
      }
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or:[
          {toUserId,fromUserId},
          {toUserId:fromUserId,fromUserId:toUserId}
        ]
      })

      if(existingConnectionRequest){
        return res.status(400).send({message:"Connection request already sent !"})
      }

      const connectionRequest = new ConnectionRequest({
        toUserId,
        fromUserId,
        status
      });

      const data =await connectionRequest.save();
      res.json({
        message:"Connection request sent successfully!",
        data,
      })


    } catch (err) {
      res.status(400).send("Error sending request" + err.message);
    }
  }
);

module.exports = requestRouter;
