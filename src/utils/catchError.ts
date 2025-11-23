import type { NextFunction, Request, Response } from "express";
import { appError } from "./appError.js";

export const catchError = (fn: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((err: any) => {
            next(new appError(err, 500));
        });
    };
};