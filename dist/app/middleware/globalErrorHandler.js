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
    let message = "something went wrong";
    let errorSources = [
        {
            path: "",
            message: "something went wrong",
        },
    ];
    // mongoose error
    if (err.name === "ValidationError") {
        const simplified = (0, handleValidationError_1.default)(err);
        errorSources = simplified.errorSource;
    }
    else if (err.name === "CastError") {
        const simplified = (0, handleCastError_1.default)(err);
        errorSources = simplified.errorSource;
    }
    else if (err.name === 11000) {
        const simplified = (0, handleDuplicateError_1.default)(err);
        errorSources = simplified.errorSource;
    }
    // zod error
    if (err instanceof zod_1.ZodError) {
        const handleError = (0, handleZodError_1.default)(err);
        statusCode = handleError.statusCode;
        message = handleError.message;
        errorSources = handleError.errorSource;
    }
    // AppError
    if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    // Error
    if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: "",
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message: (err === null || err === void 0 ? void 0 : err.message) || message,
        errorSources,
        stack: (config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.NODE_ENV) === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
