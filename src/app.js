const express = require("express");

const connectDb = require("./config/database");
const app = express();

// app.use("/",(req,res)=>{
//     res.send("helooo from dashboard")
// });

connectDb().then(() => {
    console.log("Connection established successfully");
    app.listen(7777,()=>{
        console.log("server is successfully running on port 7777")
    });
})
.catch((err) =>{
     console.error("Connection not established successfully");

})

