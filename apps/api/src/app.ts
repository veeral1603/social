import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import routes from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env["APP_URL"] || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.use(globalErrorHandler);

export default app;
