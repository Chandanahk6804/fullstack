const { executeQuery } = require("../../config/database")

const {generateToken} = require('../../utils/jwt-helper')
const { verifyPassword } = require("../../utils/bcrypt-helper")

const { UnauthorizedError, AppError } = require("../../utils/custom-error")

const responseHandler = require("../../utils/response-handler")

const getPasswordQuery = `
    SELECT uc.password_hash, u.user_id
    FROM user_cred uc
    JOIN user u
    ON u.user_id = uc.user_id
    WHERE u.email = :email`


const login = async (req, res) => {
    const {email, password} = req.body

    const [user] = await executeQuery(getPasswordQuery, {email})

    if(!user) {
        throw new UnauthorizedError("Invalid credentials")
    }

    const hashedPassword = user.password_hash
    const userId = user.user_id
    
    const isMatch = await verifyPassword(password, hashedPassword)

    if(!isMatch) {
        throw new UnauthorizedError("Invalid credentials")
    }

    const token = generateToken(userId, email)

    return responseHandler(res, {
        statusCode: 200,
        message: "Login successful",
        data: token
    })
}

module.exports = login