const express = require("express");

const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;

    const receivedRequests = await ConnectionRequest.find({
      toUserId: loggedInuser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "You have " + receivedRequests.length + " connection requests",
      receivedRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInuser._id, status: "accepted" },
        { toUserId: loggedInuser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.equals(loggedInuser._id)) {
        return row.toUserId;
      } else return row.fromUserId;
    });

    res.json(data);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = userRouter;
