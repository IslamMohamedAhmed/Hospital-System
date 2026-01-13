import { appError } from "./appError.js";
export const catchError = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            next(new appError(err, 500));
        });
    };
};
//# sourceMappingURL=catchError.js.map