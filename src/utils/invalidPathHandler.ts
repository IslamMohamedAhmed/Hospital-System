import { appError } from "./appError.js";

export const invalidPathHandler = (req: any, res: any, next: any) => {
    const error = new appError(`❌ Route not found: ${req.originalUrl}`, 404);
    next(error);
};
