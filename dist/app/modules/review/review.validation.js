"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = exports.updateReviewValidationSchema = exports.reviewValidationSchema = void 0;
const zod_1 = require("zod");
exports.reviewValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    rating: zod_1.z
        .number()
        .min(1, { message: "Rating must be at least 1" })
        .max(5, { message: "Rating can't be more than 5" }),
    comment: zod_1.z.string().min(1, { message: "Comment is required" }),
});
exports.updateReviewValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }).optional(),
    rating: zod_1.z
        .number()
        .min(1, { message: "Rating must be at least 1" })
        .max(5, { message: "Rating can't be more than 5" })
        .optional(),
    comment: zod_1.z.string().min(1, { message: "Comment is required" }).optional(),
});
exports.reviewValidation = {
    reviewValidationSchema: exports.reviewValidationSchema,
    updateReviewValidationSchema: exports.updateReviewValidationSchema,
};
