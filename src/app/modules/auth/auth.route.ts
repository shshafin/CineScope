import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();

// create
router.post("/register", authController.register);
// update
router.post("/login", authController.login);

export const authRoute = router;
