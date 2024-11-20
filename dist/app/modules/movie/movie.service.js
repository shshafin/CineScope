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
exports.movieService = void 0;
const QueryBuilder_1 = require("../../../builder/QueryBuilder");
const movie_const_1 = require("./movie.const");
const movie_model_1 = require("./movie.model");
// create movie
const createMovieIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movie_model_1.Movie.create(payload);
    return result;
});
// get movies
const getMovieIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //! Execute movie query
    const MovieQuery = new QueryBuilder_1.QueryBuilder(payload, movie_model_1.Movie.find({}))
        .search(movie_const_1.movieSearchableFields)
        .paginate()
        .sort()
        .field()
        .filter();
    const result = yield MovieQuery.modelQuery;
    if (!result.length) {
        throw new Error("No movies available at the moment. Please check back later!");
    }
    return result;
});
// get single movie
const getSingleMovieIntoDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movie_model_1.Movie.findOne({ slug: slug });
    if (!result) {
        throw new Error("This movie is not available at the moment. Please check back later!");
    }
    return result;
});
// update movie
const updateMovieIntoDB = (slug, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movie_model_1.Movie.findOneAndUpdate({ slug: slug }, payload, {
        new: true,
    });
    return result;
});
// delete movie
const deleteMovieIntoDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movie_model_1.Movie.findOneAndUpdate({ slug: slug }, { isDeleted: true }, {
        new: true,
    });
    return result;
});
exports.movieService = {
    createMovieIntoDB,
    getMovieIntoDB,
    getSingleMovieIntoDB,
    updateMovieIntoDB,
    deleteMovieIntoDB,
};
