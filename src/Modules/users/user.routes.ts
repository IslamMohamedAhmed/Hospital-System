import express from 'express';
import { register, verify, login, changePassword, requestResetPassword, resetPassword, addUser, getAllUsers, getSingleUser, deleteUser, updateUser } from './user.controller.js';
import { checkEmail } from '../../Middlewares/checkEmail.js';
import { validateInputs } from '../../Middlewares/inputsValidation.js';
import { changePasswordValidation, loginValidation, registerValidation, requestResetPasswordValidation, resetPasswordValidation, updateUserValidation, validateParamsId } from './user.validation.js';
import { validateToken } from '../../Middlewares/validateToken.js';
import { givePermissionTo } from '../../Middlewares/givePermissionTo.js';
import { Role } from '../../../generated/prisma/enums.js';
import { findById } from '../../Middlewares/findById.js';
import { getPrisma } from '../../Middlewares/getPrisma.js';

const UserRouter = express.Router();

UserRouter.post('/register', validateInputs(registerValidation), checkEmail, register);
UserRouter.get('/verify/:token', verify);
UserRouter.post('/login', validateInputs(loginValidation), login);
UserRouter.post('/changePassword', validateToken, validateInputs(changePasswordValidation), changePassword);
UserRouter.post('/requestResetPassword', validateInputs(requestResetPasswordValidation), requestResetPassword);
UserRouter.post('/resetPassword', validateInputs(resetPasswordValidation), resetPassword);
UserRouter.route('/')
    .post(validateToken, givePermissionTo(Role.ADMIN), validateInputs(registerValidation), checkEmail, addUser)
    .get(validateToken, givePermissionTo(Role.ADMIN), getAllUsers);

UserRouter.route('/:id')
    .get(validateToken, validateInputs(validateParamsId),
        findById({ model: getPrisma.user, foreignKey: 'id', from: 'params', necessary: true, objectName: 'user' }), getSingleUser)
    .delete(validateToken, givePermissionTo(Role.ADMIN), validateInputs(validateParamsId),
        findById({ model: getPrisma.user, foreignKey: 'id', from: 'params', necessary: true, objectName: 'user' }), deleteUser)
    .put(validateToken, givePermissionTo(Role.ADMIN), validateInputs(updateUserValidation),
        findById({ model: getPrisma.user, foreignKey: 'id', from: 'params', necessary: true, objectName: 'user' }), updateUser);

export default UserRouter;


