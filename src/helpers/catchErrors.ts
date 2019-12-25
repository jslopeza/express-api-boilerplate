import { NextFunction, Request, Response } from "express";

export const catchErrors = (fn: Function) => {
  return function(req: Request, res: Response, next: NextFunction) {
    return fn(req, res, next).catch(next);
  };
};
