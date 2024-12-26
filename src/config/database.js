const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:ZE1B5Kiwfit3uF81@appdb.cdmoc.mongodb.net/devTinder"
    
  );
};

module.exports = connectDb;


