"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const review_service_1 = require("./review.service");
const catchAsync_1 = require("../../utils/catchAsync");
// create review
const createReview = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const reviewData = req.body;
    const result = yield review_service_1.reviewService.createReviewIntoDB(slug, reviewData);
    res.status(200).json({
        success: true,
        message: "Review created successfully",
        data: result,
    });
}));
// get reviews
const getReview = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield review_service_1.reviewService.getReviewsIntoDB(slug);
    res.status(200).json({
        success: true,
        message: "Reviews fetched successfully!",
        data: result,
    });
}));
// get single review
const getSingleReview = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const { id } = req.params;
    const result = yield review_service_1.reviewService.getSingleReviewIntoDB(slug, id);
    res.status(200).json({
        success: true,
        message: "Review fetched successfully!",
        data: result,
    });
}));
// update review
const updateReview = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const { id } = req.params;
    const reviewData = req.body;
    const result = yield review_service_1.reviewService.updateReviewIntoDB(slug, id, reviewData);
    res.status(200).json({
        success: true,
        message: "Review updated successfully!",
        data: result,
    });
}));
// delete review
const deleteReview = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const { id } = req.params;
    const result = yield review_service_1.reviewService.deleteReviewIntoDB(slug, id);
    res.status(200).json({
        success: true,
        message: "Review deleted successfully!",
        data: result,
    });
}));
exports.reviewController = {
    createReview,
    getReview,
    getSingleReview,
    updateReview,
    deleteReview,
};
