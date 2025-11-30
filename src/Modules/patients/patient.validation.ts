import joi from "joi";
import { Gender } from "../../../generated/prisma/enums.js";

const addPatientValidation = joi.object({
    firstName: joi.string().min(3).max(25).required().messages({
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be at most 25 characters long",
        "any.required": "Name is required!!"
    }),
    lastName: joi.string().min(3).max(25).required().messages({
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be at most 25 characters long",
        "any.required": "Name is required!!"
    }),
    gender: joi.string()
        .valid(Gender.MALE, Gender.FEMALE) // Use enum values directly
        .required()
        .messages({
            'any.only': 'gender must be one of: MALE, FEMALE',
            'any.required': 'gender is required'
        }),
    phone: joi.string().required()
        .pattern(/^\+?[1-9]\d{9,14}$/)
        .messages({
            'string.pattern.base':
                'Phone number must be a valid international number (E.164 format)',
            'any.required': 'Phone number is required'
        }),
    dateOfBirth: joi.date()
        .less('now')
        .greater('1-1-1900')
        .iso().required()
        .custom((value, helpers) => {
            const today = new Date();
            const dob = new Date(value);
            const age = today.getFullYear() - dob.getFullYear();

            if (age < 18)
                return helpers.error('any.invalid');

            return value;
        })
        .messages({
            'any.invalid': 'User must be at least 18 years old',
            'date.less': 'Date of birth must be in the past',
            'date.greater': 'Date of birth must be after January 1, 1900',
            'date.format': 'Date of birth must be in ISO format',
            'any.required': 'Date of birth is required'
        })
}).unknown(true);

const validateParamsId = joi.object({
    id: joi.string().uuid().required()
}).unknown(true);

const updatePatientValidation = joi.object({
    id: joi.string().uuid().required(),
    firstName: joi.string().min(3).max(25).messages({
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be at most 25 characters long",
    }),
    lastName: joi.string().min(3).max(25).messages({
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be at most 25 characters long",
    }),
    gender: joi.string()
        .valid(Gender.MALE, Gender.FEMALE) // Use enum values directly
        .messages({
            'any.only': 'gender must be one of: MALE, FEMALE',
        }),
    phone: joi.string()
        .pattern(/^\+?[1-9]\d{9,14}$/)
        .messages({
            'string.pattern.base':
                'Phone number must be a valid international number (E.164 format)',
        }),
    dateOfBirth: joi.date()
        .less('now')
        .greater('1-1-1900')
        .iso()
        .custom((value, helpers) => {
            const today = new Date();
            const dob = new Date(value);
            const age = today.getFullYear() - dob.getFullYear();

            if (age < 18)
                return helpers.error('any.invalid');

            return value;
        })
        .messages({
            'any.invalid': 'User must be at least 18 years old',
            'date.less': 'Date of birth must be in the past',
            'date.greater': 'Date of birth must be after January 1, 1900',
            'date.format': 'Date of birth must be in ISO format',
        })
}).unknown(true);



export {
    validateParamsId,
    addPatientValidation,
    updatePatientValidation
}
