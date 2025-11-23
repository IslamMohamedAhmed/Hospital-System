import type { NextFunction, Request, Response } from "express";
import type { appError } from "./appError.js";

export const globalErrorHandler = (err: appError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    let errorBody = {};
    if (process.env.MODE === "Production") {
        errorBody = { message: err.message };
    }
    else {
        errorBody = { message: err.message, stack: err.stack };
    }
    res.status(err.statusCode).json(errorBody);
};
