const responseHandler = (res, 
    {
        statusCode=200,
        message= 'Success',
        data =[]
    }) => {
    return res.status(statusCode).json({
        statusCode,
        message,
        data
    })
}

module.exports = responseHandler