import express from "express";
import "dotenv/config";
import cors from "cors";
import usersRoute from "./routes/users-route.js";
import postsRoute from "./routes/posts-route.js";
import categoriesRoute from "./routes/categories-route.js";
import multer from "multer";

const { PORT, BACKEND_URL } = process.env;
const app = express();
const PORT_A = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/categories", categoriesRoute);
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post(
  "/uploads",
  upload.fields([
    { name: "post-image", maxCount: 1 },
    { name: "product-image", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("Body:", req.body);
    console.log("Files:", req.files);
    res.status(200).json({ message: "Files uploaded successfully" });
  }
);

app.listen(PORT_A, () => {
  console.log(`listening on ${BACKEND_URL}:${PORT}`);
});
