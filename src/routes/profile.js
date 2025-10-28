const express = require("express");

const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    //use jwt
    //in token there is three thing -- header, payload, signature
    res.send("reading cookies" + user);
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Edit not valid !!");
    }

    const loggedInUser = req.user;
    console.log(loggedInUser);
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    console.log(loggedInUser);
    res.json({
      message: `${loggedInUser.firstName} profile edited successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

module.exports = profileRouter;
