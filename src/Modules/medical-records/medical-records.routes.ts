import express from 'express';
import { addMedicalRecord, getMedicalRecords } from './medical-records.controller.js';
import { validateInputs } from '../../Middlewares/inputsValidation.js';
import { addMedicalRecordValidation, getMedicalRecordsValidation } from './medical-records.validation.js';
import { validateToken } from '../../Middlewares/validateToken.js';
import { findById } from '../../Middlewares/findById.js';
import { getPrisma } from '../../Middlewares/getPrisma.js';

const medicalRecordRouter = express.Router();

medicalRecordRouter.route('/').post(
    validateToken,
    validateInputs(addMedicalRecordValidation),
    findById({ model: getPrisma.patient,foreignKey: 'patientId', from: 'body', necessary: true, objectName: 'patient' }),
    findById({ model: getPrisma.doctor, foreignKey: 'doctorId', from: 'body', necessary: false, objectName: 'doctor' }),
    addMedicalRecord
);

medicalRecordRouter.route('/patient/:patientId').get(
    validateToken,
    validateInputs(getMedicalRecordsValidation),
    findById({ model: getPrisma.patient, foreignKey: 'patientId', from: 'params', necessary: true, objectName: 'patient' }),
    getMedicalRecords
);

export default medicalRecordRouter;