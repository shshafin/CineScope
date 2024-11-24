"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateZodRequest_1 = __importDefault(require("../../middleware/validateZodRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const user_const_1 = require("./user.const");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
// create
router.post("/create-admin", (0, validateZodRequest_1.default)(user_validation_1.userValidation.createAdminValidationSchema), (0, auth_1.auth)(user_const_1.USER_Role.ADMIN, user_const_1.USER_Role.SUPER_ADMIN), user_controller_1.userController.createAdmin);
// update me
router.put("/me", (0, validateZodRequest_1.default)(user_validation_1.userValidation.updateUserValidationSchema), (0, auth_1.auth)(user_const_1.USER_Role.USER), user_controller_1.userController.updateMe);
// update
router.put("/:userId", (0, validateZodRequest_1.default)(user_validation_1.userValidation.updateUserValidationSchema), (0, auth_1.auth)(user_const_1.USER_Role.ADMIN, user_const_1.USER_Role.SUPER_ADMIN), user_controller_1.userController.updateUser);
exports.userRoute = router;
