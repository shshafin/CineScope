import express from "express";
import { movieController } from "./movie.controller";
import { reviewController } from "../review/review.controller";
import validateZodRequest from "../../middleware/validateZodRequest";
import { movieValidation } from "./movie.validation";
import { reviewValidation } from "../review/review.validation";
const router = express.Router();

// movie routes
router.post(
  "/",
  validateZodRequest(movieValidation.movieValidationSchema),
  movieController.createMovie
);
router.get("/", movieController.getMovie);
router.get("/:slug", movieController.getSingleMovie);

// review routes
router.post(
  "/:slug/review",
  validateZodRequest(reviewValidation.reviewValidationSchema),
  reviewController.createReview
);
router.get("/:slug/review", reviewController.getReview);
router.get("/:slug/review/:id", reviewController.getSingleReview);
router.patch(
  "/:slug/review/:id",
  validateZodRequest(reviewValidation.updateReviewValidationSchema),
  reviewController.updateReview
);
router.delete("/:slug/review/:id", reviewController.deleteReview);

export const movieRoute = router;
