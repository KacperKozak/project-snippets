function replaceFileVars(path, data) {
    return path.replace(/\(([^\)]+)?\)/g, function($1, $2) {
        return data[$2];
    });
}

module.exports = replaceFileVars;
