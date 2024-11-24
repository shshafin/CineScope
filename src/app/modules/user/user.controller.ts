import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";

// !create user
const createAdmin = catchAsync(async (req, res) => {
  const result = await userService.createAdminIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: "Admin created successfully",
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

// !update me
const updateMe = catchAsync(async (req, res) => {
  const userEmail = (req as any).user.email; // Get the user's ID from the request
  const payload = req.body; // Get the update data from the request body

  const updatedUser = await userService.updateMeIntoDB(userEmail, payload);

  if (updatedUser) {
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  }
});

export const userController = {
  createAdmin,
  updateUser,
  updateMe,
};
