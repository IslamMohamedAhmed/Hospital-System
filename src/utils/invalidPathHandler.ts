import type { NextFunction, Request, Response } from "express";
import { appError } from "./appError.js";


export const invalidPathHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new appError(`❌ Route not found: ${req.originalUrl}`, 404);
    next(error);
};
