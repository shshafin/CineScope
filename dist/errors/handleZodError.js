"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const handleError = err.issues.map((err) => {
        return {
            path: err.path[err.path.length - 1],
            message: err.message,
        };
    });
    const statusCode = 404;
    return {
        statusCode,
        message: err.name,
        errorSource: handleError,
    };
};
exports.default = handleZodError;
