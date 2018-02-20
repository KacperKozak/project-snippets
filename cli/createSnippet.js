'use strict';

const fs = require('fs');
const glob = require('glob');
const ejs = require('ejs');
const chalk = require('chalk');
const ejsLint = require('ejs-lint');
const { trimEnd } = require('lodash');

const prepareCases = require('./helpers/prepareCases');
const replaceFileVars = require('./helpers/replaceFileVars');
const snippetsToSrcPath = require('./helpers/snippetsToSrcPath');
const copyFileWithTransform = require('./helpers/copyFileWithTransform');

function createSnippet(snippetPath, options) {
    const srcPath = snippetsToSrcPath(snippetPath);

    if (!fs.lstatSync(snippetPath).isDirectory()) {
        throw `Snippet [${snippetPath}] is a file, all snippets should be a directory with .snippet on end!`;
    }

    const files = glob.sync(snippetPath + '**/*.tpl');
    const dirs = glob.sync(snippetPath + '*/**/');
    const names = prepareCases('some name', options.name);

    if (!files.length) {
        throw chalk.red`No files found with the extension .tpl in ${snippetPath}`;
    }

    dirs.forEach(dir => {
        const srcDir = snippetsToSrcPath(dir);
        const rdyDir = replaceFileVars(srcDir, names);

        if (fs.existsSync(rdyDir)) {
            throw `${rdyDir} already exists!`;
        }
        fs.mkdirSync(rdyDir);
    });

    files.forEach(file => {
        const srcFile = snippetsToSrcPath(file);
        const noTplFile = trimEnd(srcFile, '.tpl');
        const rdyFile = replaceFileVars(noTplFile, names);

        copyFileWithTransform(
            file,
            rdyFile,
            content => ejs.render(content, names),
            path => {
                console.log(chalk`${path} {green.bold ✔}`);
            },
        );
    });
}

module.exports = createSnippet;
