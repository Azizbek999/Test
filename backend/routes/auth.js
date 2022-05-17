import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import multer from "multer";

const router = express.Router();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/, "-").replace(/:/, "-") +
        file.originalname
    );
  },
});

const upload = multer({ storage: storage });

// Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    photo: req.body.photo,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log(savedUser);
  } catch (err) {
    res.status(404).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // !user && res.status(401).json("Wrong User Name");
    console.log(user);
    if (user) {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const password = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (password === req.body.password) {
        const accessToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SEC,
          {
            expiresIn: "1 days",
          }
        );
        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
      } else {
        res.status(401).json("Wrong password");
      }
    } else {
      res.status(401).json("Wrong User Name");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deauthenticate - log out
// Delete refresh token
router.delete("/login", (req, res) => {
  const refreshToken = req.header("x-auth-token");

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(204);
});


export default router;
