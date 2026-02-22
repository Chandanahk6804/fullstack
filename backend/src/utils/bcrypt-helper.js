require('dotenv').config()
const bcrypt = require('bcrypt');
const { AppError } = require('./custom-error');

const hashPassword = async (password) => {
    try {
        //console.log(typeof process.env.SALT)
        return await bcrypt.hash(password, Number(process.env.SALT))
    } catch (error) {
        console.log("Bcrypt error: ", error)
        throw new AppError(
            500,
            "Password hashing failed",
            "PASSWORD_HASHING_FAILED"
        )
    }
}   
 
const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = {hashPassword, verifyPassword};