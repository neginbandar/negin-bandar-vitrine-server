import express from "express";
import "dotenv/config";
import cors from "cors";
import usersRoute from "./routes/users-route.js";
import postsRoute from "./routes/posts-route.js";

const { PORT, BACKEND_URL } = process.env;
const app = express();
const PORT_A = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use(express.static("public"));

app.listen(PORT_A, () => {
  console.log(`listening on ${BACKEND_URL}:${PORT}`);
});
