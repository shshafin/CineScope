"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_const_1 = require("./user.const");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: Object.keys(user_const_1.USER_Role),
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: 0,
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: Object.keys(user_const_1.USER_STATUS),
        default: user_const_1.USER_STATUS.ACTIVE,
    },
    passwordChangedAt: {
        type: Date,
    },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
