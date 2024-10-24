import express from "express";
//import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const router = express.Router();

router.route("/").get((req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json"));
    // const user = users.map((user) => {
    //   return {
    //     user_id: user.user_id,
    //     user_type: user.user_type,
    //     username: user.username,
    //     password: user.password,
    //     first_name: user.first_name,
    //     last_name: user.last_name,
    //     profile_picture: user.profile_picture,
    //     profile_about: user.profile_about,
    //   };
    // });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error reading videos data." });
  }
});

export default router;
