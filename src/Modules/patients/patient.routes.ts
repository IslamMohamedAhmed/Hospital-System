import express from 'express';
import { validateToken } from '../../Middlewares/validateToken.js';
import { givePermissionTo } from '../../Middlewares/givePermissionTo.js';
import { Role } from '../../../generated/prisma/enums.js';
import { validateInputs } from '../../Middlewares/inputsValidation.js';
import { addPatientValidation, updatePatientValidation, validateParamsId } from './patient.validation.js';
import { addPatient, deletePatient, getAllPatients, getSinglePatient, updatePatient } from './patient.controller.js';
import { findById } from '../../Middlewares/findById.js';
import { getPrisma } from '../../Middlewares/getPrisma.js';



const PatientRouter = express.Router();

PatientRouter.route('/')
    .post(validateToken, givePermissionTo(Role.ADMIN), validateInputs(addPatientValidation), addPatient)
    .get(validateToken, givePermissionTo(Role.ADMIN), getAllPatients);
PatientRouter.route('/:id')
    .get(validateToken, validateInputs(validateParamsId),
        findById({ model: getPrisma.patient, foreignKey: 'id', from: 'params', necessary: true, objectName: 'patient' })
        , getSinglePatient)
    .delete(validateToken, givePermissionTo(Role.ADMIN), validateInputs(validateParamsId),
        findById({ model: getPrisma.patient, foreignKey: 'id', from: 'params', necessary: true, objectName: 'patient' })
        , deletePatient)
    .put(validateToken, givePermissionTo(Role.ADMIN), validateInputs(updatePatientValidation),
        findById({ model: getPrisma.patient, foreignKey: 'id', from: 'params', necessary: true, objectName: 'patient' }),
        updatePatient);

export default PatientRouter;


