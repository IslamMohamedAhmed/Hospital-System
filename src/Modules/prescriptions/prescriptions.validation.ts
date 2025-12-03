import joi from "joi";

const addPrescriptionValidation = joi.object({
    patientId: joi.string().uuid().required().messages({
        "any.required": "patientId is required!!"
    }),
    doctorId: joi.string().uuid(),
    dosage: joi.string().max(1000).required().messages({
        "any.required": "dosage is required!!",
        "string.max": "dosage must be at most 1000 characters long"
    }),
    medication: joi.string().max(1000).required().messages({
        "any.required": "medication is required!!",
        "string.max": "medication must be at most 1000 characters long"
    }),
    instructions: joi.string().max(1000).messages({
        "string.max": "instructions must be at most 1000 characters long"
    })
}).unknown(true);

const getPrescriptionsValidations = joi.object({
    id: joi.string().uuid().required()
}).unknown(true);

export {
    addPrescriptionValidation,
    getPrescriptionsValidations
};
