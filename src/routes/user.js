const express = require("express");

const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;

    const receivedRequests = await ConnectionRequest.find({
      toUserId: loggedInuser._id,
      status: "interested",
    });

    res.json({
      message: "You have " + receivedRequests.length + " connection requests",
      receivedRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
