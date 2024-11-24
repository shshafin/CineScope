import { z } from "zod";

// Movie Validation Schema for Creation
const movieValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  releaseDate: z
    .string()
    .date("Please provide a valid date in this format yyyy-MM-dd"),
  genre: z.string().min(1, "please add genre"),
  isDeleted: z.boolean().default(false),
});

// Movie Validation Schema for Update (Optional fields)
const movieUpdateValidationSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  releaseDate: z
    .string()
    .date("Please provide a valid date in this format yyyy-MM-dd")
    .optional(),
  genre: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

export const movieValidation = {
  movieValidationSchema,
  movieUpdateValidationSchema,
};
