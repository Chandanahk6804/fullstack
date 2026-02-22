const { AppError, UnauthorizedError } = require("../../utils/custom-error")
const { verifyToken } = require("../../utils/jwt-helper")

const authenticate = (req, res, next) => {
    const header = req.headers['authorization']

    if(!header) {
        throw new UnauthorizedError("Authorization token missing")
    }

    if (!header.startsWith("Bearer ")) {
        throw new AppError(
            401,
            "Invalid authorization format",
            "InvalidTokenFormat"
        );
    }

    const token = header.split(' ')[1]

    if (!token) {
        throw new UnauthorizedError("Token missing")
    }
    const payload = verifyToken(token)

    res.locals.user = payload
    next()
}

module.exports = authenticate