import { Request, Response } from "express";

/*
  Development Error Handler

  In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
export const developmentErrors = (err: any, req: Request, res: Response) => {
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      "<mark>$&</mark>"
    ),
  };
  res.status(err.status || 500);
  res.json(errorDetails);
};

/*
  Production Error Handler

  No stacktraces are leaked to user
*/
export const productionErrors = (err: any, req: Request, res: Response) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
};
