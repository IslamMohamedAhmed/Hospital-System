import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from "express";
import { appError } from "../utils/appError.js";
import { env } from 'prisma/config';
import { getPrisma } from './getPrisma.js';

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined = Array.isArray(req.headers['token']) ? req.headers['token'][0] : req.headers['token'];
        if (!token) return next(new appError('token is not provided!!', 401));
        const decoded: any = jwt.verify(token, env('JWT_KEY_SIGNIN'));
        let user = await getPrisma.user.findUnique({
            where: { id: decoded?.userInfo.id }
        });
        if (!user) return next(new appError('user is not found!!',404));

        const time = Math.floor((user?.PasswordChangedAt?.getTime() ?? 0) / 1000);
        if (time > decoded.iat) return next(new appError('invalid token, please login again!!', 401));

        req.headers['user-info'] = decoded.userInfo;
        next();
    } catch (err: any) {
        return next(new appError(err?.message || err, 401));
    }
};