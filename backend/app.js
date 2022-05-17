import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import account from "./routes/account.js";
import people from "./routes/people.js";
import cors from "cors";

import * as path from "path";
dotenv.config({ path: "./config/config.env" });
// const __dirname = path.resolve()

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Static files
// app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/auth", auth);
app.use("/api/account", account);
app.use("/api/people", people);

const PORT = process.env.PORT || 5050;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
