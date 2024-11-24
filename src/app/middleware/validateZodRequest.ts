import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { catchAsync } from "../utils/catchAsync";

const validateZodRequest = (Schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = await Schema.parseAsync(req.body);
    req.body = parsedBody.body ?? parsedBody;
    next();
  });
};

export default validateZodRequest;
