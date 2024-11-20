"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const errorSource = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        success: false,
        message: "CastError",
        errorSource,
    };
};
exports.default = handleCastError;
