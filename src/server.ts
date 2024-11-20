/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);

    server = app.listen(config.port, () => {
      console.log(
        `🚀💥 ${new Date().toLocaleString()} - 🌟 Server is LIVE on port ${
          config.port
        } in ${process.env.NODE_ENV || "development"} mode! 💥🚀`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();

//! handle unhandled rejection
process.on("unhandledRejection", () => {
  console.log("👿 unhandledRejection is detected, shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

//! handle uncaught exception
process.on("uncaughtException", () => {
  console.log("👿 uncaughtException is detected, shutting down...");
  process.exit(1);
});
