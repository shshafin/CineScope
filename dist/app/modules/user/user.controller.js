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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const user_service_1 = require("./user.service");
// !create user
const createAdmin = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createAdminIntoDB(req.body);
    res.status(200).json({
        success: true,
        message: "Admin created successfully",
        data: result,
    });
}));
// !update user
const updateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_service_1.userService.updateUserIntoDB(userId, req.body);
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result,
    });
}));
// !update me
const updateMe = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.user.email; // Get the user's ID from the request
    const payload = req.body; // Get the update data from the request body
    const updatedUser = yield user_service_1.userService.updateMeIntoDB(userEmail, payload);
    if (updatedUser) {
        res.status(200).json({
            success: true,
            data: updatedUser,
        });
    }
}));
exports.userController = {
    createAdmin,
    updateUser,
    updateMe,
};
