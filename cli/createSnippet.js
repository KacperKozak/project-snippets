const process = require('process');
const fs = require('fs');
const path = require('path');
const ncp = require('ncp');
const glob = require('glob');

function createSnippet(snippetPath, options) {
    console.log('createSnippet', snippetPath, options);

    const srcPath = snippetPath.replace(/^\.\/\.snippets\//, '');

    if (!fs.lstatSync(snippetPath).isDirectory()) {
        console.error('All snippets should be a directory!');
        return process.exit(1);
    }

    const files = glob.sync(snippetPath + '**/*.tpl');
    console.log(files);
    ncp(snippetPath, srcPath, console.log);
}

module.exports = createSnippet;
