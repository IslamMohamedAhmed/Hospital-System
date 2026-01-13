import type { NextFunction, Request, Response } from "express";
import type { appError } from "./appError.js";
export declare const globalErrorHandler: (err: appError, req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=globalErrorHandler.d.ts.map