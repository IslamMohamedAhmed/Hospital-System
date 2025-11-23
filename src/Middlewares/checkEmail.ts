import type { NextFunction, Request, Response } from "express";
import { getPrisma } from "./getPrisma.js";
import 'dotenv/config'

export const checkEmail = async (req: Request, res: Response, next: NextFunction) => {
    
    const userExist = await getPrisma.user.findUnique({
        where: { email: req.body.email },
    });
    if (userExist) return next(new Error("Email already in use"));
    next();
}