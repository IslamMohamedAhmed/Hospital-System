import { appError } from "../utils/appError.js";
export const givePermissionTo = (role) => {
    return (req, res, next) => {
        let user = req.headers['user-info'];
        let allowed = (role == user.role ? true : false);
        let test = allowed && user.verified;
        if (!test)
            return next(new appError('user is not allowed to do this action!!', 401));
        next();
    };
};
//# sourceMappingURL=givePermissionTo.js.map