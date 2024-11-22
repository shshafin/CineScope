import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";

// !create user
const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const userController = {
  createUser,
};
