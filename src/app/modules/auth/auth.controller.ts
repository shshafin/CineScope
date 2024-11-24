import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";

// !register
const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body);

  res.status(200).json({
    success: true,
    message: "Successfully registered",
    data: result,
  });
});

// !login
const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await authService.login(req.body);

  // cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Successfully logged in",
    data: { accessToken },
  });
});

export const authController = {
  register,
  login,
};
