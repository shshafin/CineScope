"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.db_url);
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`🚀💥 ${new Date().toLocaleString()} - 🌟 Server is LIVE on port ${config_1.default.port} in ${process.env.NODE_ENV || "development"} mode! 💥🚀`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
//! handle unhandled rejection
process.on("unhandledRejection", () => {
    console.log("👿 unhandledRejection is detected, shutting down...");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
//! handle uncaught exception
process.on("uncaughtException", () => {
    console.log("👿 uncaughtException is detected, shutting down...");
    process.exit(1);
});
