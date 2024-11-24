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
exports.auth = void 0;
const user_const_1 = require("../modules/user/user.const");
const catchAsync_1 = require("../utils/catchAsync");
const user_model_1 = require("../modules/user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
// Auth middleware to restrict access to specific roles
const auth = (...roles) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if authorization token exists
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError_1.default(401, "Authorization token is missing");
        }
        try {
            // Verify the token and extract payload
            const verifiedToken = jsonwebtoken_1.default.verify(accessToken, config_1.default.jwt_access_secret);
            const { role, email } = verifiedToken;
            // Find user in database
            const user = yield user_model_1.User.findOne({ email });
            if (!user) {
                throw new AppError_1.default(401, "User not found");
            }
            // Check if user is blocked
            if (user.status === user_const_1.USER_STATUS.BLOCKED) {
                throw new AppError_1.default(401, "User account is blocked");
            }
            // Debugging log to check roles
            console.log("Allowed roles:", roles);
            console.log("User role:", role);
            // Check if user's role is in the allowed roles array
            if (!roles.includes(role)) {
                throw new AppError_1.default(403, "Access denied: insufficient permissions");
            }
            // Attach user info to request
            req.user = { email, role };
            next();
        }
        catch (error) {
            if (error instanceof AppError_1.default) {
                throw error;
            }
            throw new AppError_1.default(403, "Invalid or expired token");
        }
    }));
};
exports.auth = auth;
