import mongoose, { Schema } from "mongoose";
import { TMovie } from "./movie.interface";
import { format } from "date-fns";
import slugify from "slugify";

export const movieSchema = new Schema<TMovie>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  slug: { type: String },
});

// pre hook middleware:slug creation
movieSchema.pre("save", async function (next) {
  // title-date
  const date = format(this?.releaseDate, "dd-MM-yyyy");
  // slug creating
  this.slug = slugify(`${this?.title}-${date}`, { lower: true });

  next();
});

export const Movie = mongoose.model<TMovie>("Movie", movieSchema);
