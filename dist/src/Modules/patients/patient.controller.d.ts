import type { NextFunction, Request, Response } from "express";
declare const addPatient: (req: Request, res: Response, next: NextFunction) => void;
declare const updatePatient: (req: Request, res: Response, next: NextFunction) => void;
declare const getSinglePatient: (req: Request, res: Response, next: NextFunction) => void;
declare const deletePatient: (req: Request, res: Response, next: NextFunction) => void;
declare const getAllPatients: (req: Request, res: Response, next: NextFunction) => void;
export { addPatient, getSinglePatient, getAllPatients, updatePatient, deletePatient };
//# sourceMappingURL=patient.controller.d.ts.map