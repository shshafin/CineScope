"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSource = [
        {
            path: err.path,
            message: `${extractedMessage} already exists`,
        },
    ];
    return {
        errorSource,
    };
};
exports.default = handleDuplicateError;
