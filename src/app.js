const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlwares/auth");

app.use("/admin", adminAuth);

app.get("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User Data sent");
});

app.get("/admin/allUserData", (req, res) => {
  res.send("All data sent");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
