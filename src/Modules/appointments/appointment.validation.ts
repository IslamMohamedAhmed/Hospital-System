import joi from "joi";

const addAppointmentValidation = joi.object({
    date: joi.date()
        .min('now')
        .iso().required()
        .messages({
            'date.min': 'Date must be starting from today\'s date',
            'date.format': 'Date of birth must be in ISO format',
            'any.required': 'Date of birth is required'
        }),
    patientId: joi.string().uuid(),
    doctorId: joi.string().uuid(),
    status: joi.string().valid('SCHEDULED', 'COMPLETED', 'CANCELLED').messages({
        "any.only": "status must be one of 'SCHEDULED', 'COMPLETED', 'CANCELLED'",
    }),
    notes: joi.string().max(500).messages({
        "string.max": "notes must be at most 500 characters long"
    })
}).unknown(true);

const validateParamsId = joi.object({
    id: joi.string().uuid().required()
}).unknown(true);

const updateAppointmentValidation = joi.object({
    id: joi.string().uuid(),
    date: joi.date()
        .min('now')
        .iso()
        .messages({
            'date.min': 'Date must be starting from today\'s date',
            'date.format': 'Date of birth must be in ISO format',
        }),
    patientId: joi.string().uuid(),
    doctorId: joi.string().uuid(),
    status: joi.string().valid('SCHEDULED', 'COMPLETED', 'CANCELLED').messages({
        "any.only": "status must be one of 'SCHEDULED', 'COMPLETED', 'CANCELLED'",
    }),
    notes: joi.string().max(500).messages({
        "string.max": "notes must be at most 500 characters long"
    })
}).unknown(true);

const appointmentStatusValidation = joi.object({
    id: joi.string().uuid().required(),
    status: joi.string().valid('SCHEDULED', 'COMPLETED', 'CANCELLED').required().messages({
        "any.only": "status must be one of 'SCHEDULED', 'COMPLETED', 'CANCELLED'",
        "any.required": "status is required!!"
    })
}).unknown(true);

export {
    validateParamsId,
    addAppointmentValidation,
    updateAppointmentValidation,
    appointmentStatusValidation
};
