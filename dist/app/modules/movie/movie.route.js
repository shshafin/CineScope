"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRoute = void 0;
const express_1 = __importDefault(require("express"));
const movie_controller_1 = require("./movie.controller");
const review_controller_1 = require("../review/review.controller");
const validateZodRequest_1 = __importDefault(require("../../middleware/validateZodRequest"));
const movie_validation_1 = require("./movie.validation");
const review_validation_1 = require("../review/review.validation");
const router = express_1.default.Router();
// movie routes
router.post("/", (0, validateZodRequest_1.default)(movie_validation_1.movieValidation.movieValidationSchema), movie_controller_1.movieController.createMovie);
router.get("/", movie_controller_1.movieController.getMovie);
router.get("/:slug", movie_controller_1.movieController.getSingleMovie);
// review routes
router.post("/:slug/review", (0, validateZodRequest_1.default)(review_validation_1.reviewValidation.reviewValidationSchema), review_controller_1.reviewController.createReview);
router.get("/:slug/review", review_controller_1.reviewController.getReview);
router.get("/:slug/review/:id", review_controller_1.reviewController.getSingleReview);
router.patch("/:slug/review/:id", (0, validateZodRequest_1.default)(review_validation_1.reviewValidation.updateReviewValidationSchema), review_controller_1.reviewController.updateReview);
router.delete("/:slug/review/:id", review_controller_1.reviewController.deleteReview);
exports.movieRoute = router;
