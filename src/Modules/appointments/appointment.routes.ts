import express from 'express';
import { validateToken } from '../../Middlewares/validateToken.js';
import { givePermissionTo } from '../../Middlewares/givePermissionTo.js';
import { Role } from '../../../generated/prisma/enums.js';
import { validateInputs } from '../../Middlewares/inputsValidation.js';
import { addAppointmentValidation, appointmentStatusValidation, updateAppointmentValidation, validateParamsId } from './appointment.validation.js';
import { findById } from '../../Middlewares/findById.js';
import { getPrisma } from '../../Middlewares/getPrisma.js';
import { addAppointment, deleteAppointment, getAllAppointments, getSingleAppointment, updateAppointment, updateAppointmentStatus } from './appointment.controller.js';
const AppointmentRouter = express.Router();

AppointmentRouter.route('/')
    .post(validateToken, givePermissionTo(Role.ADMIN), validateInputs(addAppointmentValidation),
        findById({ model: getPrisma.patient, foreignKey: 'patientId', from: 'body', necessary: true, objectName: 'patient' }),
        findById({ model: getPrisma.doctor, foreignKey: 'doctorId', from: 'body', necessary: true, objectName: 'doctor' }),
        addAppointment)
    .get(validateToken, givePermissionTo(Role.ADMIN), getAllAppointments);
AppointmentRouter.route('/:id')
    .get(validateToken, givePermissionTo(Role.ADMIN), validateInputs(validateParamsId),
        findById({ model: getPrisma.appointment, foreignKey: 'id', from: 'params', necessary: true, objectName: 'appointment' }),
        getSingleAppointment)
    .delete(validateToken, givePermissionTo(Role.ADMIN), validateInputs(validateParamsId),
        findById({ model: getPrisma.appointment, foreignKey: 'id', from: 'params', necessary: true, objectName: 'appointment' }),
        deleteAppointment)
    .put(validateToken, givePermissionTo(Role.ADMIN), validateInputs(updateAppointmentValidation),
        findById({ model: getPrisma.appointment, foreignKey: 'id', from: 'params', necessary: true, objectName: 'appointment' }),
        findById({ model: getPrisma.doctor, foreignKey: 'doctorId', from: 'body', necessary: false, objectName: 'doctor' }),
        findById({ model: getPrisma.patient, foreignKey: 'patientId', from: 'body', necessary: false, objectName: 'patient' }),
        updateAppointment);
AppointmentRouter.route('/:id/status').patch(validateToken, givePermissionTo(Role.ADMIN), validateInputs(appointmentStatusValidation),
    findById({ model: getPrisma.appointment, foreignKey: 'id', from: 'params', necessary: true, objectName: 'appointment' }),
    updateAppointmentStatus);

export default AppointmentRouter;


