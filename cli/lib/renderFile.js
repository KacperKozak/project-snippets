const ejs = require('ejs');

function renderFile(content, vars) {
    return ejs.render(content, vars);
}

module.exports = renderFile;
