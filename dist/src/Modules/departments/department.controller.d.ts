import type { NextFunction, Request, Response } from "express";
declare const addDepartment: (req: Request, res: Response, next: NextFunction) => void;
declare const updateDepartment: (req: Request, res: Response, next: NextFunction) => void;
declare const getSingleDepartment: (req: Request, res: Response, next: NextFunction) => void;
declare const deleteDepartment: (req: Request, res: Response, next: NextFunction) => void;
declare const getAllDepartments: (req: Request, res: Response, next: NextFunction) => void;
export { addDepartment, updateDepartment, getSingleDepartment, deleteDepartment, getAllDepartments };
//# sourceMappingURL=department.controller.d.ts.map