const express = require('express')

const {signupSchema, loginSchema} = require('./validation/user-schema')

const validate = require('./middleware/validate-schema')

const signup = require('./controller/signup')
const login = require('./controller/login')

const router = express.Router()

//router.get('/', (req, res) => res.json({message: "Hello Welcome"}))

router.post('/signup', validate(signupSchema), signup)
router.post('/login', validate(loginSchema), login)

module.exports = router