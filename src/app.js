const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");



app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //encrypting the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();

    res.send("User created successfully");
  } catch (e) {
    console.log(e);
    res.status(400).send("error saving the user  " + e);
  }
});

app.post("/login",async(req,res) => {
  try{
    const {emailId,password} = req.body;

    const user = User.findOne({emailId: emailId});
    if(!user){
      throw new Error ("invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid){
      //create a jwt token
      const token = await jwt.sign({_id:user._id},"DEV@TINDER$123")
      //set the token in cookies
      res.cookie("token",token);

      res.send("login successful");
    }else{
      throw new Error("invalid credentials");

    }
  }catch (error) {
    res.status(400).send("something went wrong" + error);
  }
})

app.get("/profile",async(req,res)=>{
  const cookies = req.cookies;

  const {token} = cookies;
  //validate my token

  const decodedMessage = await jwt.verify(token,"DEV@TINDER$123");
  const {_id} = decodedMessage;
  console.log("LoggedIn user is " + _id);
  

  //console.log(cookies);
  res.send("reading cookies");
})

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      return res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.find(users);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every(
      (k = ALLOWED_UPDATES.includes(k))
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("update not allowed");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send("something went wrong");
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
