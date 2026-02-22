const {AppError} = require('../utils/custom-error')

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    console.log(err)

    if (err instanceof AppError) {
        return res.status(statusCode).json({
            success: false,
            errorCode: err.errorCode,
            message: err.message
        })
    }

    return res.status(500).json({
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
    })
}

module.exports = errorHandler