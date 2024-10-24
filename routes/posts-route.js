import express from "express";
// import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const router = express.Router();

router.route("/").get((req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json"));
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error reading videos data." });
  }
});

export default router;
