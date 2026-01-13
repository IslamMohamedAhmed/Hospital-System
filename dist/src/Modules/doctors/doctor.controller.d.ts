import type { NextFunction, Request, Response } from "express";
declare const addDoctor: (req: Request, res: Response, next: NextFunction) => void;
declare const updateDoctor: (req: Request, res: Response, next: NextFunction) => void;
declare const getSingleDoctor: (req: Request, res: Response, next: NextFunction) => void;
declare const deleteDoctor: (req: Request, res: Response, next: NextFunction) => void;
declare const getAllDoctors: (req: Request, res: Response, next: NextFunction) => void;
export { getSingleDoctor, getAllDoctors, deleteDoctor, addDoctor, updateDoctor };
//# sourceMappingURL=doctor.controller.d.ts.map