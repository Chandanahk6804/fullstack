const {executeTransaction} = require('../../config/database')
const responseHandler = require('../../utils/response-handler')

const insertUserQuery = `
    INSERT INTO user(user_name, email, role_id)
    VALUES (:userName, :email, "R002")`

const insertCredQuery = `
    INSERT INTO user_cred(password)
    VALUES (:password)`


const signup = async (req, res) => {
    const {userName, email, password} = req.body;
    const params = [userName, email]

    const result = await executeTransaction(async (con) => {
        const results = []

        const userInsertResult = await con.execute(insertUserQuery, params)
        results.push(userInsertResult)

        const userCredInsertResult = await con.execute(insertCredQuery, [password])
        results.push(userCredInsertResult)

        return results
    })

    return responseHandler(res, {
        statusCode: 200,
        message: "User signup successful",
        data: result
    })
}

module.exports = signup