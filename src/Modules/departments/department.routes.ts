import express from 'express';
import { validateToken } from '../../Middlewares/validateToken.js';
import { givePermissionTo } from '../../Middlewares/givePermissionTo.js';
import { Role } from '../../../generated/prisma/enums.js';
import { validateInputs } from '../../Middlewares/inputsValidation.js';
import { addDepartment, deleteDepartment, getAllDepartments, getSingleDepartment, updateDepartment } from './department.controller.js';
import { addDepartmentValidation, updateDepartmentValidation, validateParamsId } from './department.validation.js';
import { findById } from '../../Middlewares/findById.js';
import { getPrisma } from '../../Middlewares/getPrisma.js';


const DepartmentRouter = express.Router();

DepartmentRouter.route('/')
    .post(validateToken, givePermissionTo(Role.ADMIN), validateInputs(addDepartmentValidation), addDepartment)
    .get(validateToken, givePermissionTo(Role.ADMIN), getAllDepartments);
DepartmentRouter.route('/:id')
    .get(validateToken, validateInputs(validateParamsId),
        findById({ model: getPrisma.department, foreignKey: 'id', from: 'params', necessary: true, objectName: 'department' }), getSingleDepartment)
    .delete(validateToken, givePermissionTo(Role.ADMIN), validateInputs(validateParamsId),
        findById({ model: getPrisma.department, foreignKey: 'id', from: 'params', necessary: true, objectName: 'department' }), deleteDepartment)
    .put(validateToken, givePermissionTo(Role.ADMIN), validateInputs(updateDepartmentValidation),
        findById({ model: getPrisma.department, foreignKey: 'id', from: 'params', necessary: true, objectName: 'department' }), updateDepartment);

export default DepartmentRouter;


