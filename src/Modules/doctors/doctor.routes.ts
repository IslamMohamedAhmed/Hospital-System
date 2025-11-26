import express from 'express';
import { validateToken } from '../../Middlewares/validateToken.js';
import { givePermissionTo } from '../../Middlewares/givePermissionTo.js';
import { Role } from '../../../generated/prisma/enums.js';
import { validateInputs } from '../../Middlewares/inputsValidation.js';
import { addDoctorValidation, updateDoctorValidation, validateParamsId } from './doctor.validation.js';
import { addDoctor, deleteDoctor, getAllDoctors, getSingleDoctor, updateDoctor } from './doctor.controller.js';
import { findById } from '../../Middlewares/findById.js';
import { getPrisma } from '../../Middlewares/getPrisma.js';



const DoctorRouter = express.Router();

DoctorRouter.route('/')
    .post(validateToken, givePermissionTo(Role.ADMIN), validateInputs(addDoctorValidation),
        findById({ model: getPrisma.user, foreignKey: 'userId', from: 'body', necessary: true, objectName: 'user' }),
        findById({ model: getPrisma.department, foreignKey: 'departmentId', from: 'body', necessary: false, objectName: 'department' }),
        addDoctor)
    .get(validateToken, givePermissionTo(Role.ADMIN), getAllDoctors);
DoctorRouter.route('/:id')
    .get(validateToken, validateInputs(validateParamsId),
        findById({ model: getPrisma.doctor, foreignKey: 'id', from: 'params', necessary: true, objectName: 'doctor' }), getSingleDoctor)
    .delete(validateToken, givePermissionTo(Role.ADMIN), validateInputs(validateParamsId),
        findById({ model: getPrisma.doctor, foreignKey: 'id', from: 'params', necessary: true, objectName: 'doctor' }), deleteDoctor)
    .put(validateToken, givePermissionTo(Role.ADMIN), validateInputs(updateDoctorValidation),
        findById({ model: getPrisma.doctor, foreignKey: 'id', from: 'params', necessary: true, objectName: 'doctor' }),
        findById({ model: getPrisma.user, foreignKey: 'userId', from: 'body', necessary: false, objectName: 'user' }),
        findById({ model: getPrisma.department, foreignKey: 'departmentId', from: 'body', necessary: false, objectName: 'department' }),
        updateDoctor);

export default DoctorRouter;


