const express = require("express");

const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { validateProfileEditData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isAllowed = validateProfileEditData(req);
    const update = req.body;

    if (!isAllowed) {
      throw new Error("Update not allowed");
    }

    const loggedInuser = req.user;

    await User.findByIdAndUpdate(loggedInuser._id, update, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("Your profile is updated");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
