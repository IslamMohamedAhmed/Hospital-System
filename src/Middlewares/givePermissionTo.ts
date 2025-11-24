import type { NextFunction, Request, Response } from "express";
import { appError } from "../utils/appError.js";

export const givePermissionTo = (...roles: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let user: any = req.headers['user-info'];
        let allowed = roles.includes(user.role);
        let test = allowed && user.verified;
        if (!test) return next(new appError('user is not allowed to do this action!!', 401));
        next()
    };
};
