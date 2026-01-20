import express from "express";
import { globalErrorHandler } from "./utils/globalErrorHandler";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello, World!");
});

app.use(globalErrorHandler);

export default app;
