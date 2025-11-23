import joi from 'joi';
import type { NextFunction, Request, Response } from "express";
import { appError } from "../utils/appError.js";

export const validateInputs = (schema: joi.Schema, fileFieldNames: any[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let filter = { ...req.params, ...req.headers, ...req.body, ...req.query };
         const reqWithFiles = req as any;
        if (reqWithFiles.file && fileFieldNames.length == 1) {

            filter[fileFieldNames[0]] = reqWithFiles.file;
        }
        else if (reqWithFiles.files && fileFieldNames.length > 0) {
            fileFieldNames.forEach(field => {
                if (reqWithFiles.files[field]) {
                    filter[field] = reqWithFiles.files[field];
                }
            });
        }
        let { error } = schema.validate(filter, { abortEarly: false });
        if (error) {
            let errMessages: string[] = [];
            error.details.forEach((val: any) => {
                errMessages.push(val.message);
            });
            next(new appError(errMessages.join(', '), 400));
        }
        else {
            next();
        }
    };
};

