import joi from "joi";

const addDoctorValidation = joi.object({
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
    specialization: joi.string().min(3).max(25).required().messages({
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be at most 25 characters long",
        "any.required": "Name is required!!"
    }),
    userId: joi.string().uuid().required(),
    departmentId: joi.string().uuid(),
}).unknown(true);

const validateParamsId = joi.object({
    id: joi.string().uuid().required()
}).unknown(true);

const updateDoctorValidation = joi.object({
    id: joi.string().uuid().required(),
    firstName: joi.string().min(3).max(25).messages({
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be at most 25 characters long"
    }),
    lastName: joi.string().min(3).max(25).messages({
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be at most 25 characters long",
    }),
    specialization: joi.string().min(3).max(25).messages({
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be at most 25 characters long",
    }),
    userId: joi.string().uuid(),
    departmentId: joi.string().uuid(),
}).unknown(true);



export {
    validateParamsId,
    addDoctorValidation,
    updateDoctorValidation
}
