"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieValidation = void 0;
const zod_1 = require("zod");
// Movie Validation Schema for Creation
const movieValidationSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    releaseDate: zod_1.z
        .string()
        .date("Please provide a valid date in this format yyyy-MM-dd"),
    genre: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().default(false),
});
// Movie Validation Schema for Update (Optional fields)
const movieUpdateValidationSchema = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    releaseDate: zod_1.z
        .string()
        .date("Please provide a valid date in this format yyyy-MM-dd")
        .optional(),
    genre: zod_1.z.string().optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.movieValidation = {
    movieValidationSchema,
    movieUpdateValidationSchema,
};
