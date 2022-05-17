import express from "express";
import User from "../models/User.js";
import authToken from "../middleware/authenticateToken.js";

const router = express.Router();

// Get All Users
router.get("/", authToken, async (req, res) => {
  // const query = req.query.new;
  try {
    // const currentUser = await User.findOne({ email: req.params.email });
    const allUsers = await User.find();
    // allUsers.filter(!currentUser);

    // const {currentUser, ...others} =

    // userExceptCurrent = [currentUser]
    // const users = await User.where.not(id = req.params.id)
    // const users = User.find({ $nor: [{ _id: req.params.id }] });
    console.log("this");
    console.log(allUsers);
    return res.status(200).json(allUsers);
    console.log("sending users");
  } catch (err) {
    return res.status(500).json(err);
    console.log("Not sending users");
  }
});

export default router;
