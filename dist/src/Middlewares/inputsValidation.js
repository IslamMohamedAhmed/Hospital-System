import joi from 'joi';
import { appError } from "../utils/appError.js";
export const validateInputs = (schema, fileFieldNames = []) => {
    return (req, res, next) => {
        let filter = { ...req.params, ...req.headers, ...req.body, ...req.query };
        const reqWithFiles = req;
        if (reqWithFiles.file && fileFieldNames.length == 1) {
            filter[fileFieldNames[0]] = reqWithFiles.file;
        }
        else if (reqWithFiles.files && fileFieldNames.length > 0) {
            fileFieldNames.forEach(field => {
                if (reqWithFiles.files[field]) {
                    filter[field] = reqWithFiles.files[field];
                }
            });
        }
        let { error } = schema.validate(filter, { abortEarly: false });
        if (error) {
            let errMessages = [];
            error.details.forEach((val) => {
                errMessages.push(val.message);
            });
            next(new appError(errMessages.join(', '), 400));
        }
        else {
            next();
        }
    };
};
//# sourceMappingURL=inputsValidation.js.map