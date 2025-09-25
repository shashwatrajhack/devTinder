const express = require("express");

const app = express();

app.use(express.json());

const connectDB = require("./src/config/database");
const User = require("./src/models/user");

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("error saving the user");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("user not found");
  }
});

app.delete("/user", async (req, res) => {
  let userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data,{
      returnDocument:"after",
      //to put validation during update use runvalidators
      runValidators:true,
    });
    res.send("User updated successfully");

  } catch (err) {
    res.status(400).send("Something went wrong : "+err.message);
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
