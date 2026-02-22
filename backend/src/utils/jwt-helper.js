require('dotenv').config()
const jwt = require('jsonwebtoken')
const { AppError, UnauthorizedError } = require('./custom-error')

const generateToken =  (userId, email) => {
    const payload = {
        id: userId,
        email: email
    }

    try {
        const token = jwt.sign (
            payload,
            process.env.JWT_SECRET
        )

        return token
    }
    catch(error) {
        console.log("JWT error "+ error)
        throw new AppError(
            500,
            "Failed to generate token",
            "JWTGenerationError"
        )
    }
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
    catch(error) {
        console.log("JWT error "+ error)
        throw new UnauthorizedError("Invalid or Expired token")
    }
}
module.exports = {generateToken, verifyToken}