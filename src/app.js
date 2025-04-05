const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.send("User created successfully");
  } catch (e) {
    res.status(400).send("error saving the user" + e);
  }
});

connectDb()
  .then(() => {
    console.log("Connection established successfully");
    app.listen(7777, () => {
      console.log("server is successfully running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Connection not established successfully");
  });
