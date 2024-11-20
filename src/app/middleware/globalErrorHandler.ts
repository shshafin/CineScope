/* eslint-disable @typescript-eslint/no-unused-vars */
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
  let message = "something went wrong";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  // mongoose error
  if (err.name === "ValidationError") {
    const simplified = handleValidationError(err);
    errorSources = simplified.errorSource;
  } else if (err.name === "CastError") {
    const simplified = handleCastError(err);
    errorSources = simplified.errorSource;
  } else if (err.name === 11000) {
    const simplified = handleDuplicateError(err);
    errorSources = simplified.errorSource;
  }

  // zod error
  if (err instanceof ZodError) {
    const handleError = handleZodError(err);
    statusCode = handleError.statusCode;
    message = handleError.message;
    errorSources = handleError.errorSource;
  }

  // AppError
  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  // Error
  if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message: err?.message || message,
    errorSources,
    stack: config?.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
