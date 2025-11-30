import type { NextFunction, Request, Response } from "express";
import { catchError } from "../../utils/catchError.js";
import { getPrisma } from "../../Middlewares/getPrisma.js";
import { appError } from '../../utils/appError.js';

const addDepartment = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const name = await getPrisma.department.findUnique({
        where: {
            name: req.body.name
        }
    });
    if (name) return next(new appError('Department name has to be unique & that name was used before!!', 401));
    await getPrisma.department.create({
        data: req.body
    });
    res.status(201).json({ message: "department was added successfully!!" });
});

const updateDepartment = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const dataToUpdate: any = {};
    if (name) {
        const dname = await getPrisma.department.findUnique({
            where: {
                name: req.body.name
            }
        });
        if (dname) return next(new appError('Department name has to be unique & that name was used before!!', 401));
        dataToUpdate.name = name;
    }

    if (Object.keys(dataToUpdate).length === 0) {
        return next(new appError('No fields to update', 400));
    }
    if (!req.params.id) return next(new appError('Department ID is required', 401));
    await getPrisma.department.update({
        where: { id: req.params.id },
        data: dataToUpdate,
    });
    res.status(201).json({ message: "department was updated successfully!!" });
});

const getSingleDepartment = catchError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) return next(new appError('Department ID is required', 401));
    const department = await getPrisma.department.findUnique({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ message: "success", department });
});

const deleteDepartment = catchError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id) return next(new appError('Department ID is required', 401));
    await getPrisma.department.delete({
        where: {
            id: req.params.id
        }
    });
    res.status(201).json({ message: "department was deleted successfully!!" });
});

const getAllDepartments = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const allDepartments = await getPrisma.department.findMany({});
    res.status(200).json({ message: "success", allDepartments });
});



export {
    addDepartment,
    updateDepartment,
    getSingleDepartment,
    deleteDepartment,
    getAllDepartments
};


