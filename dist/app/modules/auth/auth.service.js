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
exports.authService = void 0;
const config_1 = __importDefault(require("../../config"));
const user_const_1 = require("../user/user.const");
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//! register
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // user existence check
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new Error("User already exists");
    }
    // role
    payload.role = user_const_1.USER_Role.USER;
    // create new user
    const newUser = yield user_model_1.User.create(payload);
    return newUser;
});
//! login
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // user existence check
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (!user) {
        throw new Error("User doesn't exists");
    }
    //   user status check
    if (user.status === "BLOCKED") {
        throw new Error("User is blocked");
    }
    // password match check
    const passwordMatch = yield (0, auth_utils_1.isPasswordMatched)(payload.password, user.password);
    if (!passwordMatch) {
        throw new Error("Password not matched");
    }
    // JWT Payload
    const jwtPayload = {
        email: user.email,
        role: user.role,
    };
    // JWT Access Token
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    // JWT Refresh Token
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, {
        expiresIn: config_1.default.jwt_refresh_expires_in,
    });
    return {
        accessToken,
        refreshToken,
    };
});
exports.authService = {
    register,
    login,
};
