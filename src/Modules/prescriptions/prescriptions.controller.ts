import type { NextFunction, Request, Response } from "express";
import { catchError } from "../../utils/catchError.js";
import { getPrisma } from "../../Middlewares/getPrisma.js";
import { appError } from "../../utils/appError.js";



const addPrescription = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const prescription = await getPrisma.prescription.create({
        data: req.body,
        include: {
            patient: true,
            doctor: true
        }
    });
    res.status(201).json({ message: "Prescription added successfully.", prescription });
});

const getPrescriptions = catchError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) return next(new appError('Patient ID is required', 401));
    const prescriptions = await getPrisma.prescription.findMany({
        where: { patientId: req.params.id },
        include: {
            patient: true,
            doctor: true
        }
    });
    res.status(200).json({ message: "Success", prescriptions });
});

export {
    addPrescription,
    getPrescriptions
}
