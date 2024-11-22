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

// !update user
const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await userService.updateUserIntoDB(userId, req.body);

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  updateUser,
};
