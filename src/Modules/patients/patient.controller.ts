import type { NextFunction, Request, Response } from "express";
import { catchError } from "../../utils/catchError.js";
import { getPrisma } from "../../Middlewares/getPrisma.js";
import { appError } from '../../utils/appError.js';
import { Role } from "../../../generated/prisma/enums.js";

const addPatient = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const patient = await getPrisma.patient.create({
        data: req.body
    });
    res.status(201).json({ message: "patient was added successfully!!", patient });
});

const updatePatient = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, phone, dateOfBirth, gender } = req.body;

    const dataToUpdate: any = {};
    if (firstName) dataToUpdate.firstName = firstName;
    if (lastName) dataToUpdate.lastName = lastName;
    if (phone) dataToUpdate.phone = phone;
    if (dateOfBirth) dataToUpdate.dateOfBirth = dateOfBirth;
    if (gender) dataToUpdate.gender = gender;

    if (Object.keys(dataToUpdate).length === 0) {
        return next(new appError('No fields to update', 400));
    }
    if (!req.params.id) return next(new appError('Patient ID is required', 401));
    const patient = await getPrisma.patient.update({
        where: { id: req.params.id },
        data: dataToUpdate,
    });
    res.status(201).json({ message: "patient was updated successfully!!", patient });
});

const getSinglePatient = catchError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) return next(new appError('Patient ID is required', 401));
    const patient = await getPrisma.patient.findUnique({
        where: {
            id: req.params.id
        },
        include: {
            appointments: true,
            medicalRecords: true,
            prescriptions: true
        }
    });
    res.status(200).json({ message: "success", patient });
});

const deletePatient = catchError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) return next(new appError('Patient ID is required', 401));
    await getPrisma.patient.delete({
        where: {
            id: req.params.id
        }
    });
    res.status(201).json({ message: "patient was deleted successfully!!" });
});

const getAllPatients = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const allPatients = await getPrisma.patient.findMany({});
    res.status(200).json({ message: "success", allPatients });
});



export {
    addPatient,
    getSinglePatient,
    getAllPatients,
    updatePatient,
    deletePatient
};


