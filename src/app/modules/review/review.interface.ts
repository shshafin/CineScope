import { Types } from "mongoose";

export type TReview = {
  movie: Types.ObjectId;
  email: string;
  rating: number;
  comment: string;
  isDelete?: boolean;
};
