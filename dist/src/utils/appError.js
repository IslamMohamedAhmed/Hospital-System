export class appError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
;
//# sourceMappingURL=appError.js.map