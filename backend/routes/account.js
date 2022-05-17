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

router.patch("/find/:id", authToken, async (req, res) => {
  try {
    const update = await User.findOne({ _id: req.params.id });

    if (req.body.name) {
      update.name = req.body.name;
    }

    if (req.body.password) {
      update.email = req.body.email;
    }

    if (req.body.photo) {
      update.photo = req.body.photo;
    }

    await update.save();
    return res.send(update);
  } catch {
    res.status(404);
    return res.send({ error: "Post doesn't exist!" });
  }
});

export default router;
