'use strict';

const fs = require('fs');
const glob = require('glob');
const ejs = require('ejs');
const chalk = require('chalk');
const { trimEnd } = require('lodash');

const prepareCases = require('./helpers/prepareCases');
const replaceFileVars = require('./helpers/replaceFileVars');
const snippetsToSrcPath = require('./helpers/snippetsToSrcPath');
const copyFileWithTransform = require('./helpers/copyFileWithTransform');
const getFilesAndDirs = require('./helpers/getFilesAndDirs');

function createSnippet(snippetPath, values, options) {
    const { files, dirs } = getFilesAndDirs(snippetPath);
    const names = prepareCases('some name', values.name);

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
