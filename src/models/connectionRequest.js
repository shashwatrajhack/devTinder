const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["interested","rejected","ignored","pending"],
            message:`{VALUE} is incorrect status type`
        }
    }
},
{timestamps:true});

connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Can't send request to yourself")
    }
    next();
});

const ConnectioRequest = mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectioRequest;