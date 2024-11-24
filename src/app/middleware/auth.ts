import { NextFunction, Request, Response } from "express";
import { USER_Role, USER_STATUS } from "../modules/user/user.const";
import { catchAsync } from "../utils/catchAsync";
import { User } from "../modules/user/user.model";
import AppError from "../../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// Auth middleware to restrict access to specific roles
export const auth = (...roles: (keyof typeof USER_Role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Check if authorization token exists
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      throw new AppError(401, "Authorization token is missing");
    }

    try {
      // Verify the token and extract payload
      const verifiedToken = jwt.verify(
        accessToken,
        config.jwt_access_secret as string
      ) as JwtPayload;

      const { role, email } = verifiedToken;

      // Find user in database
      const user = await User.findOne({ email });
      if (!user) {
        throw new AppError(401, "User not found");
      }

      // Check if user is blocked
      if (user.status === USER_STATUS.BLOCKED) {
        throw new AppError(401, "User account is blocked");
      }

      // Debugging log to check roles
      console.log("Allowed roles:", roles);
      console.log("User role:", role);

      // Check if user's role is in the allowed roles array
      if (!roles.includes(role)) {
        throw new AppError(403, "Access denied: insufficient permissions");
      }

      // Attach user info to request
      (req as any).user = { email, role };

      next();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(403, "Invalid or expired token");
    }
  });
};
