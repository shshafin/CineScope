import mongoose from "mongoose";
import { TErrorSources } from "../interface/error.interface";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSource: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );

  return {
    success: false,
    message: "Validation Error",
    errorSource,
  };
};

export default handleValidationError;
