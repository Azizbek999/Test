import express from "express";
import User from "../models/User.js";
import { verifyTokenAndAuthorization } from "./verifyToken.js";

const router = express.Router();

// Get All Users
router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  // const query = req.query.new;
  try {
    const users = await User.find();

    res.status(200).json(users);
    console.log("sending users");
  } catch (err) {
    res.status(500).json(err);
    console.log("Not sending users");
  }
});

export default router;