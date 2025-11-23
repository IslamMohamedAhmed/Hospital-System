import express from 'express';
import { register, verify, login } from './user.controller.js';
import { checkEmail } from '../../Middlewares/checkEmail.js';
import { validateInputs } from '../../Middlewares/inputsValidation.js';
import { loginValidation, registerValidation } from './user.validation.js';

const UserRouter = express.Router();

UserRouter.post('/register', validateInputs(registerValidation), checkEmail, register);
UserRouter.get('/verify/:token', verify);
UserRouter.post('/login', validateInputs(loginValidation), login);


export default UserRouter;


