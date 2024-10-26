import express from "express";
//import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const router = express.Router();

router.route("/").get((req, res) => {
  try {
    const categories = JSON.parse(fs.readFileSync("./data/categories.json"));
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error reading categories data." });
  }
});

export default router;
