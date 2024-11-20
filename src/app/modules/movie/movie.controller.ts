import { movieService } from "./movie.service";
import { catchAsync } from "../../utils/catchAsync";

// create movie
const createMovie = catchAsync(async (req, res) => {
  const movieData = req.body;
  const result = await movieService.createMovieIntoDB(movieData);

  res.status(200).json({
    success: true,
    message: "Movie created successfully",
    data: result,
  });
});

// get movies
const getMovie = catchAsync(async (req, res) => {
  const result = await movieService.getMovieIntoDB(req.query);

  res.status(200).json({
    success: true,
    message: "Movies fetched successfully!",
    data: result,
  });
});

// get movies
const getSingleMovie = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const result = await movieService.getSingleMovieIntoDB(slug);

  res.status(200).json({
    success: true,
    message: "Movie fetched successfully!",
    data: result,
  });
});

export const movieController = {
  createMovie,
  getMovie,
  getSingleMovie,
};
