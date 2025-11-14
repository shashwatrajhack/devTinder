const express = require("express");
const app = express();
app.use(express.json());
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
const authRouter = require("./routes/auth")
const connectionRouter = require("./routes/request")
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");

app.use("/",authRouter);
app.use("/",connectionRouter);
app.use("/",profileRouter);
app.use("/",userRouter);

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
