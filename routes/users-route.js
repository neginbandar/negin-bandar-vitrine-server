import express from "express";
import fs from "fs";

const router = express.Router();

router.route("/").get((req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json"));
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error reading videos data." });
  }
});

router.route("/:user_id").get(async (req, res) => {
  const { user_id } = req.params;
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json"));
    const user = users.find((user) => user.user_id === parseInt(user_id));
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error fetching users", error);
  }
});

export default router;
