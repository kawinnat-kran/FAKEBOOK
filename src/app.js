import express from "express";
import authRoute from "./routes/auth.route.js";

const app = express();
app.use(express.json());

app.use("/api/auth/", authRoute);
app.use("/api/post", (req, res) => {
  res.send("Post service");
});
app.use("/api/comment", (req, res) => {
  res.send("Comment service");
});
app.use("/api/like", (req, res) => {
  res.send("Like service");
});

export default app;
