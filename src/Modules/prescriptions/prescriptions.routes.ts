import express from 'express';
import { validateToken } from '../../Middlewares/validateToken.js';
import { validateInputs } from '../../Middlewares/inputsValidation.js';
import { addPrescriptionValidation, getPrescriptionsValidations } from './prescriptions.validation.js';
import { findById } from '../../Middlewares/findById.js';
import { getPrisma } from '../../Middlewares/getPrisma.js';
import { addPrescription, getPrescriptions } from './prescriptions.controller.js';

const prescriptionRouter = express.Router();

prescriptionRouter.route('/').post(
    validateToken,
    validateInputs(addPrescriptionValidation),
    findById({ model: getPrisma.patient,foreignKey: 'patientId', from: 'body', necessary: true, objectName: 'patient' }),
    findById({ model: getPrisma.doctor, foreignKey: 'doctorId', from: 'body', necessary: false, objectName: 'doctor' }),
    addPrescription
);

prescriptionRouter.route('/patient/:id').get(
    validateToken,
    validateInputs(getPrescriptionsValidations),
    findById({ model: getPrisma.patient, foreignKey: 'id', from: 'params', necessary: true, objectName: 'patient' }),
    getPrescriptions
);

export default prescriptionRouter;