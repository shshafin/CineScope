import { Movie } from "../movie/movie.model";
import { TReview } from "./review.interface";
import { Review } from "./review.model";
import { startSession } from "mongoose";

const createReviewIntoDB = async (
  slug: string,
  reviewData: Partial<TReview>
): Promise<TReview | undefined> => {
  const session = await startSession();

  const movie = await Movie.findOne({ slug: slug });
  if (!movie) {
    throw new Error("Movie not found");
  }

  try {
    session.startTransaction();

    const review = await Review.create(
      [
        {
          movie: movie._id,
          ...reviewData,
        },
      ],
      { session }
    );

    //   total count of reviews
    const reviewsCount = await Review.countDocuments({
      movie: movie._id,
    }).session(session);
    await Movie.updateOne({ slug }, { totalRating: reviewsCount });

    await session.commitTransaction();

    return review[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
  session.endSession();
};

// get review
const getReviewsIntoDB = async (slug: string) => {
  const movie = await Movie.findOne({ slug: slug });
  const result = await Review.find({ movie: movie?._id });
  return result;
};

// get single review
const getSingleReviewIntoDB = async (slug: string, id: string) => {
  const movie = await Movie.findOne({ slug: slug });
  const result = await Review.findById({ movie: movie?._id, _id: id });
  return result;
};

// update review
const updateReviewIntoDB = async (
  slug: string,
  id: string,
  reviewData: TReview
) => {
  const movie = await Movie.findOne({ slug: slug });
  const result = await Review.findByIdAndUpdate(
    { movie: movie?._id, _id: id },
    reviewData,
    { new: true }
  );
  return result;
};

// delete review
const deleteReviewIntoDB = async (slug: string, id: string) => {
  const session = await startSession();
  const movie = await Movie.findOne({ slug: slug });
  if (!movie) {
    throw new Error("Movie not found");
  }
  try {
    session.startTransaction();

    // Find and update the review's isDelete field
    const result = await Review.findByIdAndUpdate(
      id, // Find review by id
      { isDelete: true }, // Update isDelete to true
      { new: true, session } // Return the updated document and use the session
    );

    // Count the number of non-deleted reviews for the movie
    await Review.countDocuments({
      movie: movie._id,
      isDelete: false, // Only count reviews that are not marked as deleted
    }).session(session);
    const updatedTotalRating = Math.max(0, movie.totalRating - 1);

    // Update the movie's totalRating field with the new review count
    await Movie.updateOne(
      { slug },
      { totalRating: updatedTotalRating }, // Set totalRating to the new review count
      { session: session }
    );

    await session.commitTransaction();

    return result;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  }
  session.endSession();
};

export const reviewService = {
  createReviewIntoDB,
  getReviewsIntoDB,
  getSingleReviewIntoDB,
  updateReviewIntoDB,
  deleteReviewIntoDB,
};
