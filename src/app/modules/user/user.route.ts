import express from "express";
import validateZodRequest from "../../middleware/validateZodRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";

const router = express.Router();

// create
router.post(
  "/create-admin",
  validateZodRequest(userValidation.userValidationSchema),
  userController.createUser
);
// update
router.put(
  "/:userId",
  validateZodRequest(userValidation.updateUserValidationSchema),
  userController.updateUser
);

export const userRoute = router;
