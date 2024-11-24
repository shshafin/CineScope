"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const user_const_1 = require("./user.const");
const createAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        role: zod_1.z.nativeEnum(user_const_1.USER_Role).default(user_const_1.USER_Role.ADMIN),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
        status: zod_1.z.nativeEnum(user_const_1.USER_STATUS).default(user_const_1.USER_STATUS.ACTIVE),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        role: zod_1.z.nativeEnum(user_const_1.USER_Role).optional(),
        status: zod_1.z.nativeEnum(user_const_1.USER_STATUS).optional(),
    }),
});
exports.userValidation = {
    createAdminValidationSchema,
    updateUserValidationSchema,
};
