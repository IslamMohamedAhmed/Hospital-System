import { Role } from './../../../generated/prisma/enums.js';
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
    const email = await getPrisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });
    if (email) return next(new appError('email has to be unique & that email was used before!!', 401));
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

const changePassword = catchError(async (req: Request, res: Response, next: NextFunction) => {
    let userData = req.headers['user-info'] as any;
    let user = await getPrisma.user.findUnique({
        where: {
            id: userData?.id
        }
    });
    if (user) {
        let match = bcrypt.compareSync(req.body.oldPassword, user.password);
        if (match) {
            let token = jwt.sign(
                {
                    userInfo: {
                        id: user.id, email: user.email, role: user.role,
                        verified: user.isVerified
                    }
                },
                env('JWT_KEY_SIGNIN')
            );
            req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 8);
            await getPrisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    password: req.body.newPassword,
                    PasswordChangedAt: new Date()
                }
            });
            res.status(201).json({ message: "password reset was successful", token });

        }
        else return next(new appError('password is incorrect', 401));

    }
    else return next(new appError('invalid user!!', 400));

});

const requestResetPassword = catchError(async (req: Request, res: Response, next: NextFunction) => {
    let user = await getPrisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });
    if (!user) return next(new appError('user is not found!!', 404));
    let token = jwt.sign({ userId: user.id }, env('JWT_KEY_RESET_PASSWORD'));
    res.status(201).json({
        message: "success",
        note: "send a template to the user to add a new password and add the following token to headers", token
    });
});

const resetPassword = catchError(async (req: Request, res: Response, next: NextFunction) => {
    let tokenHeader = req.headers['token'];
    let token: string | undefined = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;
    if (!token) return next(new appError('Token is required', 400));
    let decoded: any = jwt.verify(token, env('JWT_KEY_RESET_PASSWORD'));
    if (!decoded.userId) return next(new appError('invalid token !!', 401));
    let user = await getPrisma.user.findUnique({
        where: {
            id: decoded.userId
        }
    });
    if (!user) return next(new appError('user is not found!!', 404));
    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 8);
    await getPrisma.user.update({
        where: {
            id: user.id
        },
        data: {
            password: req.body.newPassword,
            PasswordChangedAt: new Date()

        }
    });
    let resetToken = jwt.sign(
        {
            userInfo: {
                id: user.id, email: user.email, role: user.role,
                verified: user.isVerified
            }
        },
        env('JWT_KEY_SIGNIN')
    );
    res.status(201).json({
        message: "password reset was successful!!",
        resetToken
    });
});

const addUser = catchError(async (req: Request, res: Response, next: NextFunction) => {
    req.body.PasswordChangedAt = new Date();
    req.body.isVerified = true;
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const email = await getPrisma.user.findUnique({
        where: {
            email: req.body.email
        }
    });
    if (email) return next(new appError('email has to be unique & that email was used before!!', 401));
    await getPrisma.user.create({
        data: req.body,
    });
    res.status(201).json({ message: "user was created successfully!!" });
});

const deleteUser = catchError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) return next(new appError('User ID is required', 401));
    await getPrisma.user.delete({
        where: {
            id: req.params.id
        }
    });
    res.status(201).json({ message: "user was deleted successfully!!" });
});

const getAllUsers = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const allUsers = await getPrisma.user.findMany({});
    res.status(201).json({ message: "success!!", allUsers });
});

const getSingleUser = catchError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) return next(new appError('User ID is required', 401));
    const user = await getPrisma.user.findUnique({
        where: {
            id: req.params.id
        }
    });
    res.status(201).json({ message: "success!!", user });
});

const updateUser = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { password, email, role } = req.body;

    const dataToUpdate: any = {};
    if (password) {
        dataToUpdate.password = bcrypt.hashSync(password, 8);
        dataToUpdate.PasswordChangedAt = new Date();
    }
    if (email) {
        const email = await getPrisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        if (email) return next(new appError('email has to be unique & that email was used before!!', 401));
        await getPrisma.user.create({
            data: req.body,
        });
        dataToUpdate.email = email;
    }
    if (role) dataToUpdate.role = role;  // make sure role is validated if enum

    if (Object.keys(dataToUpdate).length === 0) {
        return next(new appError('No fields to update', 400));
    }

    if (!req.params.id) return next(new appError('User ID is required', 401));
    await getPrisma.user.update({
        where: { id: req.params.id },
        data: dataToUpdate,
    });
    res.status(201).json({ message: "user was updated successfully!!" });
});



export {
    register, verify, login,
    changePassword, requestResetPassword, resetPassword,
    addUser, deleteUser, getAllUsers, getSingleUser, updateUser
};


