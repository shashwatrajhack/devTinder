const express = require("express");

const app = express();

const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Shashwat",
    lastName: "Raj",
    Gender: "Male",
    email: "Shashwat@gmail.com",
    age: "22",
  });

  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("error saving the user");
  }
});

connectDB()
  .then(() => {
    console.log("database connection established");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection cannot established");
  });
