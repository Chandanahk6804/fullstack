require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateToken =  (userId, email) => {
    const payload = {
        id: userId,
        email: email
    }

    const token = jwt.sign (
        payload,
        process.env.JWT_SECRET
    )

    return token
}


module.exports = {generateToken}