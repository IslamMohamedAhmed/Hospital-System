import { appError } from "./appError.js";

export const catchError = (fn: any) => {
    return (req: any, res: any, next: any) => {
        fn(req, res, next).catch((err:any) => {
            next(new appError(err, 500));
        });
    };
};