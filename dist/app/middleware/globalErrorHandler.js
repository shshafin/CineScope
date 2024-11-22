"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../../errors/handleDuplicateError"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong.";
    let errorSources = [
        {
            path: "",
            message: "An unknown error occurred.",
        },
    ];
    if (err.name === "ValidationError") {
        // Mongoose validation error
        const simplified = (0, handleValidationError_1.default)(err);
        statusCode = 400;
        message = simplified.message;
        errorSources = simplified.errorSource;
    }
    else if (err.name === "CastError") {
        // Mongoose cast error
        const simplified = (0, handleCastError_1.default)(err);
        statusCode = 400;
        message = simplified.message;
        errorSources = simplified.errorSource;
    }
    else if (err.code === 11000) {
        // MongoDB duplicate key error
        const simplified = (0, handleDuplicateError_1.default)(err);
        statusCode = 409;
        errorSources = simplified.errorSource;
    }
    else if (err instanceof zod_1.ZodError) {
        // Zod validation error
        const simplified = (0, handleZodError_1.default)(err);
        statusCode = simplified.statusCode || 400;
        message = simplified.message;
        errorSources = simplified.errorSource;
    }
    else if (err instanceof AppError_1.default) {
        // Custom application error
        statusCode = err.statusCode || 400;
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        // Generic JavaScript error
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    // Send response
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.NODE_ENV === "development" ? err.stack : null, // Only show stack in development mode
    });
};
exports.default = globalErrorHandler;
