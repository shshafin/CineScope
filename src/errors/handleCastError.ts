import mongoose from "mongoose";
import { TErrorSources } from "../interface/error.interface";

const handleCastError = (err: mongoose.Error.CastError) => {
  const errorSource: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    success: false,
    message: "CastError",
    errorSource,
  };
};

export default handleCastError;
