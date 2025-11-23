import express, { type Application } from "express";
import cors from "cors";
import { invalidPathHandler } from "./utils/invalidPathHandler.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
import UserRouter from "./Modules/users/user.routes.js";
export const useRoutes = (app: Application) => {
    app.use(express.json());
    app.use(cors());
    app.use('/api/v1/users', UserRouter);
    app.use(invalidPathHandler);
    app.use(globalErrorHandler);
    process.on('unhandledRejection', (err) => {
        console.log(err);
    });
}

