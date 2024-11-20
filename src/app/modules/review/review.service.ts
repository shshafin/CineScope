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

    // Increment view count
    await Movie.updateOne(
      { slug },
      {
        $inc: { viewCount: 1 },
        totalRating: await Review.countDocuments({ movie: movie._id }).session(
          session
        ),
      },
      { session }
    );

    await session.commitTransaction();

    return review[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
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

    // Find the review to be deleted
    const reviewToDelete = await Review.findById(id);
    if (!reviewToDelete) {
      throw new Error("Review not found");
    }

    // Soft delete the review
    const result = await Review.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true, session }
    );

    // Update the movie's totalRating and viewCount
    await Movie.updateOne(
      { slug },
      {
        $inc: {
          viewCount: -1,
          totalRating: -1, // Decrease total rating by 1
        },
      },
      { session: session }
    );

    await session.commitTransaction();

    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const reviewService = {
  createReviewIntoDB,
  getReviewsIntoDB,
  getSingleReviewIntoDB,
  updateReviewIntoDB,
  deleteReviewIntoDB,
};
