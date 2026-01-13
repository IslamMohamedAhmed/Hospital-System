import { getPrisma } from "./getPrisma.js";
export const checkEmail = async (req, res, next) => {
    const userExist = await getPrisma.user.findUnique({
        where: { email: req.body.email },
    });
    if (userExist)
        return next(new Error("Email already in use"));
    next();
};
//# sourceMappingURL=checkEmail.js.map