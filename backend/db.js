const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
  // check whether connection to mongo db is successfull or not
  try {
    await mongoose.connect(uri);
  } catch {
    console.error("Not connected to Mongo db");
  }
};
module.exports = connectToMongo;
