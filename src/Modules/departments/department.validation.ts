import joi from "joi";

const addDepartmentValidation = joi.object({
    name: joi.string().min(3).max(25).required().messages({
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be at most 25 characters long",
        "any.required": "Name is required!!"
    })
}).unknown(true);

const validateParamsId = joi.object({
    id: joi.string().uuid().required()
}).unknown(true);

const updateDepartmentValidation = joi.object({
    id: joi.string().uuid().required(),
    name: joi.string().min(3).max(25).required().messages({
        "string.min": "Name must be at least 3 characters long",
        "string.max": "Name must be at most 25 characters long",
        "any.required": "Name is required!!"
    })
}).unknown(true);



export {
    validateParamsId,
    updateDepartmentValidation,
    addDepartmentValidation
}
