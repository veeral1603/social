import express from "express";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import routes from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.use(globalErrorHandler);

export default app;
