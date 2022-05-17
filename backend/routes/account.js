import express from "express";
import User from "../models/User.js";
import { verifyTokenAndAuthorization } from "./verifyToken.js";

const router = express.Router();

// Get User
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
