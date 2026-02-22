const {executeTransaction} = require('../../config/database')
const responseHandler = require('../../utils/response-handler')
const {hashPassword} = require('../../utils/bcrypt-helper')

const insertUserQuery = `
    INSERT INTO user(user_name, email)
    VALUES (:userName, :email)`

const insertCredQuery = `
    INSERT INTO user_cred(user_id, password_hash)
    VALUES (:userId, :hashedPassword)`


const signup = async (req, res, next) => {
    try {
        const {userName, email, password} = req.body;
        const params = {userName, email}
        //console.log(params)
        const hashedPassword = await hashPassword(password)
        //console.log(hashedPassword)

        const result = await executeTransaction(async (con) => {
            const results = []

            const [userInsertResult] = await con.execute(insertUserQuery, params)
            const userId = userInsertResult.insertId
            //console.log(userInsertResult)
            results.push(userInsertResult)

            const userCredInsertResult = await con.execute(insertCredQuery, {userId,hashedPassword})
            results.push(userCredInsertResult)

            return results
        })

        return responseHandler(res, {
            statusCode: 200,
            message: "User signup successful",
            data: result
        })
    } catch (error) {
        next(error)
    }
    
}

module.exports = signup