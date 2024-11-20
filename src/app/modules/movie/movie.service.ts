import { QueryBuilder } from "../../../builder/QueryBuilder";
import { movieSearchableFields } from "./movie.const";
import { TMovie } from "./movie.interface";
import { Movie } from "./movie.model";

// create movie
const createMovieIntoDB = async (payload: TMovie) => {
  const result = await Movie.create(payload);
  return result;
};

// get movies
const getMovieIntoDB = async (payload: Record<string, unknown>) => {
  //! Execute movie query
  const MovieQuery = new QueryBuilder(payload, Movie.find({}))
    .search(movieSearchableFields)
    .paginate()
    .sort()
    .field()
    .filter();

  const result = await MovieQuery.modelQuery;
  if (!result.length) {
    throw new Error(
      "No movies available at the moment. Please check back later!"
    );
  }

  return result;
};

// get single movie
const getSingleMovieIntoDB = async (slug: string) => {
  const result = await Movie.findOne({ slug: slug });
  if (!result) {
    throw new Error(
      "This movie is not available at the moment. Please check back later!"
    );
  }
  return result;
};

// update movie
const updateMovieIntoDB = async (slug: string, payload: Partial<TMovie>) => {
  const result = await Movie.findOneAndUpdate({ slug: slug }, payload, {
    new: true,
  });
  return result;
};

// delete movie
const deleteMovieIntoDB = async (slug: string) => {
  const result = await Movie.findOneAndUpdate(
    { slug: slug },
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const movieService = {
  createMovieIntoDB,
  getMovieIntoDB,
  getSingleMovieIntoDB,
  updateMovieIntoDB,
  deleteMovieIntoDB,
};
