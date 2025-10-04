const express = require("express");
const app = express();
app.use(express.json());
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignupData, validateLoginData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(cookieParser());

app.post("/signup", async (req, res) => {

  try {
    validateSignupData(req);
    //password encryption
    const { firstName, lastName, emailId, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    //creating the instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send("error saving the user" + err);
  }
});

app.post("/login", async (req, res) => {
  try {
    validateLoginData(req);
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // create a jwt token
      const token = await jwt.sign({ _id: user._id }, "devTinder789");

      //Add the token to cookie and send the response back to user

      //cookie is like a temporary password which will come in all the request to the server

      res.cookie("token", token);

      res.send("Login Successfull!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("error loging the user : " + err.message);
  }
});

app.get("/profile",userAuth, async (req, res) => {
  try {
    const user = req.user;
    //use jwt
    //in token there is three thing -- header, payload, signature
    res.send("reading cookies" + user);
  } catch (err) {
    res.status(400).send("Error" + err.message);
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

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send("users not found : " + err);
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

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "photoURL",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not Allowed");
    }

    if (data.skills.length > 10) {
      throw new Error("Skill cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      //to put validation during update use runvalidators
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong : " + err.message);
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
