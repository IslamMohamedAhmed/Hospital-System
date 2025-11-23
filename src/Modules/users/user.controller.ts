import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from "express";
import { catchError } from "../../utils/catchError.js";
import sendEmail from "../../Services/sendGrid.js";
import { getPrisma } from "../../Middlewares/getPrisma.js";
import { appError } from '../../utils/appError.js';
import { env } from 'prisma/config';
import bcrypt from 'bcrypt';
const register = catchError(async (req: Request, res: Response, next: NextFunction) => {
    req.body.PasswordChangedAt = new Date();
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    await getPrisma.user.create({
        data: req.body,
    });
    await sendEmail(req.body.email);
    res.status(201).json({ message: "User created successfully, Please verify your email" });
});

const verify = catchError(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.params.token;
    if (!token) return next(new appError("Token is required", 400));
    jwt.verify(token, env('JWT_KEY_SIGNUP'), async (err: any, decoded: any) => {
        if (err) return next(new appError(err, 401));
        await getPrisma.user.updateMany({
            where: { email: decoded?.email },
            data: { isVerified: true },
        });
        res.status(200).json({ message: "Verification Succeeded" });
    });
});

const login = catchError(async (req: Request, res: Response, next: NextFunction) => {

    const user = await getPrisma.user.findUnique({
        where: { email: req.body.email },
    });
    if (user) {
        const match = bcrypt.compareSync(req.body.password, user.password);
        if (match && user.isVerified) {
            let token = jwt.sign({
                userInfo: {
                    id: user.id, email: user.email, role: user.role,
                    verified: user.isVerified
                }
            }, env('JWT_KEY_SIGNIN'));
            return res.status(200).json({ message: "Sign in Succeeded!!", token });
        }
    }
    return next(new appError("Email or password are incorrect!!", 401));
});


export { register, verify, login };


