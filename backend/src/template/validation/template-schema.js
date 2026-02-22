const joi = require('joi')

const templateSchema = joi.object({
    templateName: joi.string(),
    subject: joi.string(),
    body: joi.string()
})


const createTemplateSchema = templateSchema.fork(
    ["templateName", "subject", "body"],
    (field) => field.required()
)

module.exports = {createTemplateSchema}