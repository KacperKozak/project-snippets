'use strict';

const fs = require('fs');
const fsx = require('fs');
const chalk = require('chalk');

const copyFileWithTransform = require('./helpers/copyFileWithTransform');
const getFilesAndDirs = require('./helpers/getFilesAndDirs');

const getDestinationPath = require('./lib/getDestinationPath');
const createVars = require('./lib/createVars');
const renderFile = require('./lib/renderFile');

function createSnippet(snippetPath, values, options) {
    const { files, dirs } = getFilesAndDirs(snippetPath);
    const vars = createVars(values);

    dirs.forEach(dir => {
        const rdyDir = getDestinationPath(dir, vars);

        if (fs.existsSync(rdyDir)) throw `${rdyDir} already exists!`;

        fs.mkdirSync(rdyDir);
    });

    files.forEach(file => {
        const rdyFile = getDestinationPath(file, vars);

        copyFileWithTransform(
            file,
            rdyFile,
            content => renderFile(content, vars),
            path => {
                console.log(chalk`${path} {green.bold ✔}`);
            },
        );
    });
}

module.exports = createSnippet;
