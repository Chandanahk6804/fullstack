const extractPlaceholders = (body) => {
    const regex = /{{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*}}/g;

    const matches = []
    let match

    while ((match = regex.exec(body)) !== null) {
        matches.push(match[1])  //only capture variable name
    }

    return [...new Set(matches)]  //remove dupicates
}

module.exports = extractPlaceholders