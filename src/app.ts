import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application route
app.use("/api", router);

// not found middleware
app.use(notFound);

// unhandled rejection error handler

// global error handler middleware
app.use(globalErrorHandler);

export default app;
