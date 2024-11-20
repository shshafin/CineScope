import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateZodRequest = (Schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateZodRequest;
