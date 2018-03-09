const { trimEnd } = require('lodash');
const replaceFileVars = require('../helpers/replaceFileVars');
const snippetsToSrcPath = require('../helpers/snippetsToSrcPath');

function getDestinationPath(snippetFile, vars) {
    const srcFile = snippetsToSrcPath(snippetFile);
    const noTplFile = trimEnd(srcFile, '.tpl');
    return (rdyFile = replaceFileVars(noTplFile, vars));
}

module.exports = getDestinationPath;
