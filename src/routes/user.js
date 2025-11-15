const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

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

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName skills gender age")
      .populate("toUserId", "firstName lastName skills gender age");

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //user should see all the cards except
    //his own cards
    //connection request already sent
    //own connections
    //ignored people

    const loggedInUser = req.user;
    //pagination

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    let skip = (page - 1) * 10;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
      .select("fromUserId toUserId")
      .skip(skip)
      .limit(limit);

    const hideUserFromFeed = new Set();

    connectionRequests.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });
    console.log(hideUserFromFeed);

    const users = await User.find({
      $and: [{ $nin: Array.from(hideUserFromFeed) }, { $ne: loggedInUser._id }],
    });
    res.send(users);
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

module.exports = userRouter;
