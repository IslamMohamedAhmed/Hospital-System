import express from "express";
import cors from "cors";
import { invalidPathHandler } from "./utils/invalidPathHandler.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
export const useRoutes = (app: any) => {
    app.use(express.json());
    app.use(cors());
    app.use(invalidPathHandler);
    app.use(globalErrorHandler);
}

