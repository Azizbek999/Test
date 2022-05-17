import express from "express";
import User from "../models/User.js";
import authToken from "../middleware/authenticateToken.js";

const router = express.Router();

// Get All Users
router.get("/", authToken, async (req, res) => {
  // const query = req.query.new;
  try {
    const users = await User.find();

    return res.status(200).json(users);
    console.log("sending users");
  } catch (err) {
    return res.status(500).json(err);
    console.log("Not sending users");
  }
});

export default router;
