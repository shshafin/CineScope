import express from "express";
import validateZodRequest from "../../middleware/validateZodRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
import { USER_Role } from "./user.const";
import { auth } from "../../middleware/auth";

const router = express.Router();

// create
router.post(
  "/create-admin",
  validateZodRequest(userValidation.createAdminValidationSchema),
  auth(USER_Role.ADMIN, USER_Role.SUPER_ADMIN),
  userController.createAdmin
);
// update me
router.put(
  "/me",
  validateZodRequest(userValidation.updateUserValidationSchema),
  auth(USER_Role.USER),
  userController.updateMe
);

// update
router.put(
  "/:userId",
  validateZodRequest(userValidation.updateUserValidationSchema),
  auth(USER_Role.ADMIN, USER_Role.SUPER_ADMIN),
  userController.updateUser
);

export const userRoute = router;
