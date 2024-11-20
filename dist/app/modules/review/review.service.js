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
exports.reviewService = void 0;
const movie_model_1 = require("../movie/movie.model");
const review_model_1 = require("./review.model");
const mongoose_1 = require("mongoose");
const createReviewIntoDB = (slug, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    const movie = yield movie_model_1.Movie.findOne({ slug: slug });
    if (!movie) {
        throw new Error("Movie not found");
    }
    try {
        session.startTransaction();
        const review = yield review_model_1.Review.create([
            Object.assign({ movie: movie._id }, reviewData),
        ], { session });
        // Increment view count
        yield movie_model_1.Movie.updateOne({ slug }, {
            $inc: { viewCount: 1 },
            totalRating: yield review_model_1.Review.countDocuments({ movie: movie._id }).session(session),
        }, { session });
        yield session.commitTransaction();
        return review[0];
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
// get review
const getReviewsIntoDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield movie_model_1.Movie.findOne({ slug: slug });
    const result = yield review_model_1.Review.find({ movie: movie === null || movie === void 0 ? void 0 : movie._id });
    return result;
});
// get single review
const getSingleReviewIntoDB = (slug, id) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield movie_model_1.Movie.findOne({ slug: slug });
    const result = yield review_model_1.Review.findById({ movie: movie === null || movie === void 0 ? void 0 : movie._id, _id: id });
    return result;
});
// update review
const updateReviewIntoDB = (slug, id, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield movie_model_1.Movie.findOne({ slug: slug });
    const result = yield review_model_1.Review.findByIdAndUpdate({ movie: movie === null || movie === void 0 ? void 0 : movie._id, _id: id }, reviewData, { new: true });
    return result;
});
// delete review
const deleteReviewIntoDB = (slug, id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    const movie = yield movie_model_1.Movie.findOne({ slug: slug });
    if (!movie) {
        throw new Error("Movie not found");
    }
    try {
        session.startTransaction();
        // Find the review to be deleted
        const reviewToDelete = yield review_model_1.Review.findById(id);
        if (!reviewToDelete) {
            throw new Error("Review not found");
        }
        // Soft delete the review
        const result = yield review_model_1.Review.findByIdAndUpdate(id, { isDelete: true }, { new: true, session });
        // Update the movie's totalRating and viewCount
        yield movie_model_1.Movie.updateOne({ slug }, {
            $inc: {
                viewCount: -1,
                totalRating: -1, // Decrease total rating by 1
            },
        }, { session: session });
        yield session.commitTransaction();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
exports.reviewService = {
    createReviewIntoDB,
    getReviewsIntoDB,
    getSingleReviewIntoDB,
    updateReviewIntoDB,
    deleteReviewIntoDB,
};
