require('dotenv').config()
const express = require('express')

const errorHandler = require('./middleware/error-handler')

const userRouter = require('./user/router')

const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use('/users', userRouter)


app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})