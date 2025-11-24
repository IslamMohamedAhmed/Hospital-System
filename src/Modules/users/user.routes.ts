import express from 'express';
import { register, verify, login, changePassword, requestResetPassword, resetPassword } from './user.controller.js';
import { checkEmail } from '../../Middlewares/checkEmail.js';
import { validateInputs } from '../../Middlewares/inputsValidation.js';
import { changePasswordValidation, loginValidation, registerValidation, requestResetPasswordValidation, resetPasswordValidation } from './user.validation.js';
import { validateToken } from '../../Middlewares/validateToken.js';

const UserRouter = express.Router();

UserRouter.post('/register', validateInputs(registerValidation), checkEmail, register);
UserRouter.get('/verify/:token', verify);
UserRouter.post('/login', validateInputs(loginValidation), login);
UserRouter.post('/changePassword', validateToken, validateInputs(changePasswordValidation), changePassword);
UserRouter.post('/requestResetPassword', validateInputs(requestResetPasswordValidation), requestResetPassword);
UserRouter.post('/resetPassword', validateInputs(resetPasswordValidation), resetPassword);

export default UserRouter;


