/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.service";
import { catchAsync } from "../../utils/catchAsync";

// create review
const createReview = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const reviewData = req.body;

  const result = await reviewService.createReviewIntoDB(slug, reviewData);

  res.status(200).json({
    success: true,
    message: "Review created successfully",
    data: result,
  });
});
// get reviews
const getReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const result = await reviewService.getReviewsIntoDB(slug);

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully!",
      data: result,
    });
  }
);

// get single review
const getSingleReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const { id } = req.params;
    const result = await reviewService.getSingleReviewIntoDB(slug, id);

    res.status(200).json({
      success: true,
      message: "Review fetched successfully!",
      data: result,
    });
  }
);

// update review
const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const { id } = req.params;
    const reviewData = req.body;
    const result = await reviewService.updateReviewIntoDB(slug, id, reviewData);

    res.status(200).json({
      success: true,
      message: "Review updated successfully!",
      data: result,
    });
  }
);

// delete review
const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const { id } = req.params;
    const result = await reviewService.deleteReviewIntoDB(slug, id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully!",
      data: result,
    });
  }
);

export const reviewController = {
  createReview,
  getReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
