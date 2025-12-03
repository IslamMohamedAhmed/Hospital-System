import joi from "joi";

const addMedicalRecordValidation = joi.object({
    patientId: joi.string().uuid().required().messages({
        "any.required": "patientId is required!!"
    }),
    doctorId: joi.string().uuid(),
    diagnosis: joi.string().max(1000).required().messages({
        "any.required": "diagnosis is required!!",
        "string.max": "diagnosis must be at most 1000 characters long"
    }),
    treatment: joi.string().max(1000).messages({
        "string.max": "treatment must be at most 1000 characters long"
    })
}).unknown(true);

const getMedicalRecordsValidation = joi.object({
    patientId: joi.string().uuid().required()
}).unknown(true);

export {
    addMedicalRecordValidation,
    getMedicalRecordsValidation
};
 