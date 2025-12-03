import type { NextFunction, Request, Response } from "express";
import { catchError } from "../../utils/catchError.js";
import { getPrisma } from "../../Middlewares/getPrisma.js";
import { appError } from "../../utils/appError.js";



const addMedicalRecord = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const medicalRecord = await getPrisma.medicalRecord.create({
        data: req.body,
        include: {
            patient: true,
            doctor: true
        }
    });
    res.status(201).json({ message: "Medical record added successfully.", medicalRecord });
});

const getMedicalRecords = catchError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.patientId) return next(new appError('Patient ID is required', 401));
    const medicalRecords = await getPrisma.medicalRecord.findMany({
        where: { patientId: req.params.patientId },
        include: {
            patient: true,
            doctor: true
        }
    });
    res.status(200).json({ message: "Success", medicalRecords });
});

export {
    addMedicalRecord,
    getMedicalRecords
}
