const express = require("express");
const app = express();

// app.use("/",(req,res)=>{
//     res.send("helooo from dashboard")
// });

app.use("/admin/getAllData",
    (req,res)=>{
        //route handler
        

    res.send("all data sent")
});

app.listen(7777,()=>{
    console.log("server is successfully running on port 7777")
});