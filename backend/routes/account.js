import express from "express";
import User from "../models/User.js";
import authToken from "../middleware/authenticateToken.js";

const router = express.Router();

// Get User
router.get("/find/:id", authToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;

    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

export default router;
