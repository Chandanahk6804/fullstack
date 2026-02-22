const mysql = require('mysql2/promise')

const {AppError, BadRequestError} = require('../utils/custom-error')

let pool;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    namedPlaceholders: true
}

//To create and send a pool if not exists
const getPool = () => {
    if(!pool) {
        pool = mysql.createPool(dbConfig)
    }
    return pool
}

// Function to execute queries
const executeQuery = async (query, queryParams = []) => {
    try {
        const p = getPool()
        const [result] = await p.execute(query, queryParams)
        return result
    }
    catch(error) {
        console.log("Database error : " + error)
        if (error.code === "ER_DUP_ENTRY") {
            throw new BadRequestError("Duplicate entry found");
        }
        throw new AppError (
            500,
            "Database operation failed",
            "DATABASE_ERROR"
        )
    }
}

// Function start and complete a transaction
const executeTransaction = async (callback) => {
    const p = getPool()
    const connection = await p.getConnection()

    try {
        await connection.beginTransaction()
        const result = await callback(connection)
        await connection.commit()
        return result
    }
    catch(error) {
        console.log("Transaction error: "+ error)
        await connection.rollback()

        if (error.code === "ER_DUP_ENTRY") {
            throw new BadRequestError("Duplicate entry found");
        }

        throw new AppError(
            500,
            error,
            "DATABASE_TRANSCATION_ERROR"
        )
    }
    finally {
        connection.release()
    }
}

module.exports = {executeQuery, executeTransaction}