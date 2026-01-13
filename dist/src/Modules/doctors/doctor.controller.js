import { catchError } from "../../utils/catchError.js";
import { getPrisma } from "../../Middlewares/getPrisma.js";
import { appError } from '../../utils/appError.js';
import { Role } from "../../../generated/prisma/enums.js";
import { QueryBuilder } from "../../Services/queryBuilder/queryBuilder.js";
const addDoctor = catchError(async (req, res, next) => {
    const doctorExist = await getPrisma.doctor.findUnique({
        where: {
            userId: req.body.userId
        }
    });
    if (doctorExist)
        return next(new appError('there is a doctor with the same userId, forbidden', 401));
    const user = await getPrisma.user.findUnique({
        where: {
            id: req.body.userId
        }
    });
    if (!(user?.role == Role.DOCTOR || user?.role == Role.ADMIN))
        return next(new appError('the user role is note a doctor, invalid insertion', 400));
    const doctor = await getPrisma.doctor.create({
        data: req.body,
        include: {
            user: true
        }
    });
    res.status(201).json({ message: "doctor was added successfully!!", doctor });
});
const updateDoctor = catchError(async (req, res, next) => {
    const { firstName, lastName, specialization, userId, departmentId } = req.body;
    const dataToUpdate = {};
    if (firstName)
        dataToUpdate.firstName = firstName;
    if (lastName)
        dataToUpdate.lastName = lastName;
    if (specialization)
        dataToUpdate.specialization = specialization;
    if (departmentId)
        dataToUpdate.departmentId = departmentId;
    if (userId) {
        const doctor = await getPrisma.doctor.findUnique({
            where: {
                userId: userId
            }
        });
        if (doctor)
            return next(new appError('there is a doctor with the same userId, forbidden', 401));
        const user = await getPrisma.user.findUnique({
            where: {
                id: req.body.userId
            }
        });
        if (!(user?.role == Role.DOCTOR || user?.role == Role.ADMIN))
            return next(new appError('the user role is note a doctor, invalid insertion', 400));
        dataToUpdate.userId = userId;
    }
    if (Object.keys(dataToUpdate).length === 0) {
        return next(new appError('No fields to update', 400));
    }
    if (!req.params.id)
        return next(new appError('Doctor ID is required', 401));
    const doctor = await getPrisma.doctor.update({
        where: { id: req.params.id },
        data: dataToUpdate,
    });
    res.status(201).json({ message: "doctor was updated successfully!!", doctor });
});
const getSingleDoctor = catchError(async (req, res, next) => {
    if (!req.params.id)
        return next(new appError('Doctor ID is required', 401));
    const doctor = await getPrisma.doctor.findUnique({
        where: {
            id: req.params.id
        },
        include: {
            user: true,
            department: true,
            appointments: true,
            medicalRecords: true,
            prescriptions: true
        }
    });
    res.status(200).json({ message: "success", doctor });
});
const deleteDoctor = catchError(async (req, res, next) => {
    if (!req.params.id)
        return next(new appError('Doctor ID is required', 401));
    await getPrisma.doctor.delete({
        where: {
            id: req.params.id
        }
    });
    res.status(201).json({ message: "doctor was deleted successfully!!" });
});
const getAllDoctors = catchError(async (req, res, next) => {
    const qb = new QueryBuilder(getPrisma.doctor, req.query, ['firstName', 'lastName', 'specialization']);
    await qb
        .filter()
        .search()
        .sort()
        .fields()
        .pagination();
    const allDoctors = await qb.buildQuery();
    res.status(200).json({
        status: 'success',
        page: qb.pageNumber,
        totalPages: qb.totalPages,
        totalItems: qb.totalItems,
        data: allDoctors
    });
});
export { getSingleDoctor, getAllDoctors, deleteDoctor, addDoctor, updateDoctor };
//# sourceMappingURL=doctor.controller.js.map