const {executeQuery} = require('../../config/database')
const extractPlaceholders = require('../../utils/extract-placeholder')
const responseHandler = require('../../utils/response-handler')
const { AppError } = require('../../utils/custom-error')

const insertTemplateQuery = `
    INSERT INTO template(template_name, subject, body, placeholders)
    VALUES (:templateName, :subject, :body, :placeholders)`

const createTemplate = async (req, res) => {
    const {templateName, subject, body} = req.body

    const placeholders = extractPlaceholders(body)

    const result = await executeQuery(insertTemplateQuery, {
        templateName,
        subject,
        body,
        placeholders: JSON.stringify(placeholders)
    })

    //console.log(result)

    if(result.affectedRows === 0) {
        throw new AppError(
            500,
            "Template cannot be created"
        )
    }

    return responseHandler(res, {
            statusCode: 200,
            message: "Template created successfully",
            data: result
        }
    )
}

module.exports = createTemplate