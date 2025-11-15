export const globalErrorHandler = (err: any, req: any, res: any, next: any) => {
    err.statusCode = err.statusCode || 500;
    let errorBody = {};
    if (process.env.MODE === "Production") {
        errorBody = { message: err.message };
    }
    else {
        errorBody = { message: err.message, stack: err.stack };
    }
    res.status(err.statusCode).json(errorBody);
};
