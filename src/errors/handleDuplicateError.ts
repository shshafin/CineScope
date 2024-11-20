import { TErrorSources } from "../interface/error.interface";

const handleDuplicateError = (err: any) => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorSource: TErrorSources = [
    {
      path: err.path,
      message: `${extractedMessage} already exists`,
    },
  ];

  return {
    errorSource,
  };
};

export default handleDuplicateError;
