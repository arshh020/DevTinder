const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // Creating a instance of the User model
  const user = new User({
    firstName: "Arsh",
    lastName: "Gogia",
    emailId: "arshgogia20@gmail.com",
    password: "arsh1620",
    age: 20,
    gender: "Male",
    _id: "18889088467382946",
  });

  try {
    await user.save(); //returns a promise
    res.send("User added succesfully");
  } catch (err) {
    res.status(400).send("Error adding user: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected...");
  });
