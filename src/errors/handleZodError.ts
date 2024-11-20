import { ZodError } from "zod";

const handleZodError = (err: ZodError) => {
  const handleError = err.issues.map((err) => {
    return {
      path: err.path[err.path.length - 1],
      message: err.message,
    };
  });

  const statusCode = 404;

  return {
    statusCode,
    message: err.name,
    errorSource: handleError,
  };
};

export default handleZodError;
