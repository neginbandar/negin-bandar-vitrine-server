import express from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    try {
      const posts = JSON.parse(fs.readFileSync("./data/posts.json"));
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error reading posts data." });
    }
  })

  .post((req, res) => {
    if (!req.body) {
      return res.status(400).send("Invalid input for new post");
    } else {
      try {
        const posts = JSON.parse(fs.readFileSync("./data/posts.json"));
        const postId = posts.length + 1;
        const newPost = {
          ...req.body,
          post_id: postId,
          created_at: new Date().toISOString(),
          products: [],
        };
        console.log(newPost);
        posts.push(newPost);
        fs.writeFileSync("./data/posts.json", JSON.stringify(posts, null, 2));
        res
          .status(201)
          .json({ message: "New post created successfully", newPost });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating new post." });
      }
    }
  });

router.route("/").put((req, res) => {
  if (!req.body) {
    return res.status(400).send("Invalid input for updating post");
  }
  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json"));
    const { post_id, user_id, products } = req.body;
    const product = req.body.products[0];
    console.log(products);
    const postToUpdate = posts.find(
      (post) => post.post_id === post_id && post.user_id === user_id
    );
    if (!postToUpdate) {
      return res.status(404).send("Post not found");
    }
    if (products && products.length > 0) {
      const product = products[products.length - 1];
      postToUpdate.products.push(product);
    }

    fs.writeFileSync("./data/posts.json", JSON.stringify(posts, null, 2));
    res.status(200).json({
      message: "Post updated successfully",
      updatedPost: postToUpdate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating the post." });
  }
});

router.route("/:user_id").get((req, res) => {
  const { user_id } = req.params;
  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json"));
    console.log(`Looking for posts with user_id: ${user_id}`);
    console.log("Posts data:", posts);
    const userPosts = posts.filter(
      (post) => post.user_id === parseInt(user_id)
    );
    console.log("Filtered posts:", userPosts);
    if (userPosts.length > 0) {
      res.status(200).json(userPosts);
    } else {
      res.status(404).json({ message: "No posts yet!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving posts data." });
  }
});

export default router;
