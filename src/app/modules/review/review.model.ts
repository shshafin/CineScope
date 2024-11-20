import mongoose, { Schema } from "mongoose";
import { TReview } from "./review.interface";

export const reviewsSchema = new Schema<TReview>(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    email: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Review = mongoose.model<TReview>("Review", reviewsSchema);
