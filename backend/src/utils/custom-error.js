class AppError extends Error {
    constructor(statusCode, message, errorCode = 'INTERNAL_SERVER_ERROR') {
        super(message)
        this.statusCode = statusCode
        this.errorCode = errorCode
        Error.captureStackTrace(this, this.constructor)  // this -> Attach the stack trace to this error object,  this.constructor -> Exclude this constructor from appearing in the stack
        // Syntax: Error.captureStackTrace(targetObject, constructorToExclude);

    }
}


class BadRequestError extends AppError {
    constructor(message) {
        super(400, message, 'BAD_REQUEST')
    }
}


class UnauthorizedError extends AppError {
    constructor(message) {
        super(401, message, 'UNAUTHORIZED')
    }
}


class NotFoundError extends AppError {
    constructor(message) {
        super(404, message, 'NOT_FOUND')
    }
}

class ForbiddenError extends AppError {
    constructor(message) {
        super(403, message, 'FORBIDDEN_ACCESS')
    }
}

module.exports = {
    AppError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError,
    NotFoundError
}