import { z } from "zod";

export const reviewValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating can't be more than 5" }),
  comment: z.string().min(1, { message: "Comment is required" }),
});
export const updateReviewValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).optional(),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating can't be more than 5" })
    .optional(),
  comment: z.string().min(1, { message: "Comment is required" }).optional(),
});

export const reviewValidation = {
  reviewValidationSchema,
  updateReviewValidationSchema,
};
