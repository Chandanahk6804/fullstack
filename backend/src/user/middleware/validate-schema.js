const {AppError} = require('../../utils/custom-error')

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body)
    if(error) {
        throw new AppError (
            400,
            error.details[0].message,
            'VALIDATION_ERROR'
        )
    }
    next()
}

module.exports = validate