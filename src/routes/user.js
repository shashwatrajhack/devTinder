const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName about skills gender");

    console.log(connectionRequests);

    res.json({
      message: "Data fetched successfully",

      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});


userRouter.get("/user/connections",userAuth,async(req,res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or:[{toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId","firstName lastName skills gender age").populate("toUserId","firstName lastName skills gender age");

        const data = connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({data});


    }catch(err){
        res.status(400).send("ERROR" + err.message)

    }
})

module.exports = userRouter;
