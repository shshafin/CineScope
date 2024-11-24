import config from "../../config";
import { USER_Role } from "../user/user.const";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { isPasswordMatched } from "./auth.utils";
import jwt from "jsonwebtoken";

//! register
const register = async (payload: TUser): Promise<any> => {
  // user existence check
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new Error("User already exists");
  }

  // role
  payload.role = USER_Role.USER;

  // create new user
  const newUser = await User.create(payload);
  return newUser;
};

//! login
const login = async (payload: TLoginUser) => {
  // user existence check
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new Error("User doesn't exists");
  }

  //   user status check
  if (user.status === "BLOCKED") {
    throw new Error("User is blocked");
  }

  // password match check
  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Password not matched");
  }

  // JWT Payload
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  // JWT Access Token
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  // JWT Refresh Token
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authService = {
  register,
  login,
};
