import type { NextFunction, Request, Response } from "express";
import { appError } from "../utils/appError.js";

export const findById = (cases: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        let request = req as any;
        let id = request[cases.from]?.[cases.foreignKey];
        if (id) {
            let result = await cases.model.findUnique({
                where: {
                    id
                }
            });
            if (result) {
                next();
            }
            else {
                next(new appError(`${cases.objectName} is not found!!`, 404));
            }

        }
        else {
            if (cases.necessary) return next(new appError(`${cases.foreignKey} is not provided!!`, 401));
            else next();
        }
    }

};