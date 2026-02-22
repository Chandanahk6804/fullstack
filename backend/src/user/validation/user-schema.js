const joi = require('joi')

const userSchema = joi.object({
    userName: joi.string().max(50),
    email: joi.string().email(),
    roleId: joi.string().alphanum(),
    password: joi.string().alphanum()
})

const signupSchema = userSchema.fork(
    ["userName", "email", "password"], 
    (field) => field.required()
)

const loginSchema = userSchema.fork(
    ["email", "password"],
    (field) => field.required()
)

const updateUserSchema = userSchema.min(1)

module.exports = {signupSchema, loginSchema, updateUserSchema}