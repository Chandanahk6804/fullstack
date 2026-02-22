const express = require('express')

const { createTemplateSchema } = require('./validation/template-schema')

const validate = require('./middleware/validate-schema')
const authenticate = require('../middleware/auth/authenticate')
const authorize = require('../middleware/auth/authorize')

const createTemplate = require('./controller/create-template')

const router = express.Router()

router.post('/create-template', authenticate, authorize, validate(createTemplateSchema), createTemplate)

module.exports = router