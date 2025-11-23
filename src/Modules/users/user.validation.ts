import { Role } from './../../../generated/prisma/enums.js';
import joi from "joi";

const registerValidation = joi.object({
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'gov', 'pro'] } })
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),

    password: joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        }),

    role: joi.string()
        .valid(Role.DOCTOR, Role.NURSE, Role.RECEPTIONIST) // Use enum values directly
        .required()
        .messages({
            'any.only': 'Role must be one of: DOCTOR, NURSE, RECEPTIONIST',
            'any.required': 'Role is required'
        }),
}).unknown(true);

const loginValidation = joi.object({
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'gov', 'pro'] } })
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is required'
        }),

    password: joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        }),
}).unknown(true);


export {
    registerValidation,
    loginValidation
}
