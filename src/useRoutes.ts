import express, { type Application } from "express";
import cors from "cors";
import { invalidPathHandler } from "./utils/invalidPathHandler.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
import UserRouter from "./Modules/users/user.routes.js";
import DepartmentRouter from "./Modules/departments/department.routes.js";
import DoctorRouter from "./Modules/doctors/doctor.routes.js";
import PatientRouter from "./Modules/patients/patient.routes.js";
import AppointmentRouter from "./Modules/appointments/appointment.routes.js";
export const useRoutes = (app: Application) => {
    app.use(express.json());
    app.use(cors());
    app.use('/api/v1/users', UserRouter);
    app.use('/api/v1/departments', DepartmentRouter);
    app.use('/api/v1/doctors', DoctorRouter);
    app.use('/api/v1/patients', PatientRouter);
    app.use('/api/v1/appointments', AppointmentRouter);
    app.use(invalidPathHandler);
    app.use(globalErrorHandler);
    process.on('unhandledRejection', (err) => {
        console.log(err);
    });
}

