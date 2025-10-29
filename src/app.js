import express from "express";
import authRoute from "./routes/auth.route.js";
import createHttpError from "http-errors";
import errorMiddleware from "./middlewares/error.middleware.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import shutdownUtil from "./utils/shutdown.util.js";

const app = express();
app.use(express.json());

app.use("/api/shutdown", (req, res) => {
  shutdownUtil("SIGTERM");
});
app.use("/api/auth/", authRoute);
app.use("/api/post", (req, res) => {
  res.send("");
});
app.use("/api/comment", (req, res) => {
  res.send("");
});
app.use("/api/like", (req, res) => {
  res.send("");
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Listen for termination signals
process.on("SIGINT", () => shutdownUtil("SIGINT")); // Ctrl+C
process.on("SIGTERM", () => shutdownUtil("SIGTERM")); // kill command or Docker stop
// Catch unhandled errors
process.on("uncaughtException", () => shutdownUtil("uncaughtException"));
process.on("unhandledRejection", () => shutdownUtil("unhandledRejection"));
export default app;
