import joi from 'joi';
import type { NextFunction, Request, Response } from "express";
export declare const validateInputs: (schema: joi.Schema, fileFieldNames?: any[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=inputsValidation.d.ts.map