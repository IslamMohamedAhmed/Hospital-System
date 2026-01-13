import type { NextFunction, Request, Response } from "express";
declare const register: (req: Request, res: Response, next: NextFunction) => void;
declare const verify: (req: Request, res: Response, next: NextFunction) => void;
declare const login: (req: Request, res: Response, next: NextFunction) => void;
declare const changePassword: (req: Request, res: Response, next: NextFunction) => void;
declare const requestResetPassword: (req: Request, res: Response, next: NextFunction) => void;
declare const resetPassword: (req: Request, res: Response, next: NextFunction) => void;
declare const addUser: (req: Request, res: Response, next: NextFunction) => void;
declare const deleteUser: (req: Request, res: Response, next: NextFunction) => void;
declare const getAllUsers: (req: Request, res: Response, next: NextFunction) => void;
declare const getSingleUser: (req: Request, res: Response, next: NextFunction) => void;
declare const updateUser: (req: Request, res: Response, next: NextFunction) => void;
export { register, verify, login, changePassword, requestResetPassword, resetPassword, addUser, deleteUser, getAllUsers, getSingleUser, updateUser };
//# sourceMappingURL=user.controller.d.ts.map