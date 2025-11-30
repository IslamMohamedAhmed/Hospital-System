import type { NextFunction, Request, Response } from "express";
import { catchError } from "../../utils/catchError.js";
import { getPrisma } from "../../Middlewares/getPrisma.js";
import { appError } from '../../utils/appError.js';
import { Role } from "../../../generated/prisma/enums.js";

const addAppointment = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const appointment = await getPrisma.appointment.create({
        data: req.body,
    });
    res.status(201).json({ message: "appointment was added successfully!!", appointment });
});

const updateAppointment = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { patientId, doctorId, date, status, notes } = req.body;

    const dataToUpdate: any = {};
    if (patientId) dataToUpdate.patientId = patientId;
    if (doctorId) dataToUpdate.doctorId = doctorId;
    if (date) dataToUpdate.date = date;
    if (status) dataToUpdate.status = status;
    if (notes) dataToUpdate.notes = notes;
    if (Object.keys(dataToUpdate).length === 0) {
        return next(new appError('No fields to update', 400));
    }
    if (!req.params.id) return next(new appError('Appointment ID is required', 401));
    const appointment = await getPrisma.appointment.update({
        where: { id: req.params.id },
        data: dataToUpdate,
    });
    res.status(200).json({ message: "appointment was updated successfully!!", appointment });
});

const getSingleAppointment = catchError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) return next(new appError('Appointment ID is required', 401));
    const appointment = await getPrisma.appointment.findUnique({
        where: {
            id: req.params.id
        },
        include: {
            patient: true,
            doctor: true
        }
    });
    res.status(200).json({ message: "success", appointment });
});

const deleteAppointment = catchError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) return next(new appError('Appointment ID is required', 401));
    await getPrisma.appointment.delete({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ message: "appointment was deleted successfully!!" });
});

const getAllAppointments = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const allAppointments = await getPrisma.appointment.findMany({});
    res.status(200).json({ message: "success", allAppointments });
});

const updateAppointmentStatus = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;
    if (!req.params.id) return next(new appError('Appointment ID is required', 401));
    const appointment = await getPrisma.appointment.update({
        where: { id: req.params.id },
        data: { status },
    });
    res.status(200).json({ message: "appointment status was updated successfully!!", appointment });
});

export {
    addAppointment,
    updateAppointment,
    getSingleAppointment,
    deleteAppointment,
    getAllAppointments,
    updateAppointmentStatus
};


