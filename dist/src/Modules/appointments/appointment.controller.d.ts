import type { NextFunction, Request, Response } from "express";
declare const addAppointment: (req: Request, res: Response, next: NextFunction) => void;
declare const updateAppointment: (req: Request, res: Response, next: NextFunction) => void;
declare const getSingleAppointment: (req: Request, res: Response, next: NextFunction) => void;
declare const deleteAppointment: (req: Request, res: Response, next: NextFunction) => void;
declare const getAllAppointments: (req: Request, res: Response, next: NextFunction) => void;
declare const updateAppointmentStatus: (req: Request, res: Response, next: NextFunction) => void;
export { addAppointment, updateAppointment, getSingleAppointment, deleteAppointment, getAllAppointments, updateAppointmentStatus };
//# sourceMappingURL=appointment.controller.d.ts.map