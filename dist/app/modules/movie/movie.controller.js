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
exports.movieController = void 0;
const movie_service_1 = require("./movie.service");
const catchAsync_1 = require("../../utils/catchAsync");
// create movie
const createMovie = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieData = req.body;
    const result = yield movie_service_1.movieService.createMovieIntoDB(movieData);
    res.status(200).json({
        success: true,
        message: "Movie created successfully",
        data: result,
    });
}));
// get movies
const getMovie = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movie_service_1.movieService.getMovieIntoDB(req.query);
    res.status(200).json({
        success: true,
        message: "Movies fetched successfully!",
        data: result,
    });
}));
// get movies
const getSingleMovie = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield movie_service_1.movieService.getSingleMovieIntoDB(slug);
    res.status(200).json({
        success: true,
        message: "Movie fetched successfully!",
        data: result,
    });
}));
exports.movieController = {
    createMovie,
    getMovie,
    getSingleMovie,
};
