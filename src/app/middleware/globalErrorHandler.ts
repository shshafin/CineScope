import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../../interface/error.interface";
import handleValidationError from "../../errors/handleValidationError";
import handleCastError from "../../errors/handleCastError";
import handleDuplicateError from "../../errors/handleDuplicateError";
import { ZodError } from "zod";
import handleZodError from "../../errors/handleZodError";
import AppError from "../../errors/AppError";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong.";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "An unknown error occurred.",
    },
  ];

  if (err.name === "ValidationError") {
    // Mongoose validation error
    const simplified = handleValidationError(err);
    statusCode = 400;
    message = simplified.message;
    errorSources = simplified.errorSource;
  } else if (err.name === "CastError") {
    // Mongoose cast error
    const simplified = handleCastError(err);
    statusCode = 400;
    message = simplified.message;
    errorSources = simplified.errorSource;
  } else if (err.code === 11000) {
    // MongoDB duplicate key error
    const simplified = handleDuplicateError(err);
    statusCode = 409;
    errorSources = simplified.errorSource;
  } else if (err instanceof ZodError) {
    // Zod validation error
    const simplified = handleZodError(err);
    statusCode = simplified.statusCode || 400;
    message = simplified.message;
    errorSources = simplified.errorSource;
  } else if (err instanceof AppError) {
    // Custom application error
    statusCode = err.statusCode || 400;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    // Generic JavaScript error
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err.stack : null, // Only show stack in development mode
  });
};

export default globalErrorHandler;
