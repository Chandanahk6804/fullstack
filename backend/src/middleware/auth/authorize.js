const {executeQuery} = require('../../config/database')
const { UnauthorizedError } = require('../../utils/custom-error')
const getRoleQuery = `
    SELECT role_id
    FROM user
    WHERE user_id = :userId`

const allowedRoles = ["R001"]

const authorize = async (req, res, next) => {
    const user = res.locals.user
    const userId = user.id

    const [result] = await executeQuery(getRoleQuery, {userId})
    const roleId = result.role_id

    const allowed = allowedRoles.includes(roleId)
    if(!allowed) {
        throw new UnauthorizedError("Not authorized")
    }

    next()
}

module.exports = authorize