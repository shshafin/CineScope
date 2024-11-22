import express from "express";
import validateZodRequest from "../../middleware/validateZodRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";

const router = express.Router();

router.post(
  "/create-admin",
  validateZodRequest(userValidation.userValidationSchema),
  userController.createUser
);

export const userRoute = router;
