const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://arshgogia:eBYQ33wK6CwbIeBN@first-node-proj.ztzck.mongodb.net/DevTinder"
  );
};

module.exports = connectDB;
