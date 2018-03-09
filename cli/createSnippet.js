'use strict';

const fs = require('fs');
const chalk = require('chalk');

const copyFileWithTransform = require('./helpers/copyFileWithTransform');
const getFilesAndDirs = require('./helpers/getFilesAndDirs');
const removeEmptyDirs = require('./helpers/removeEmptyDirs');

const getDestinationPath = require('./lib/getDestinationPath');
const createVars = require('./lib/createVars');
const renderFile = require('./lib/renderFile');

function createSnippet(snippetPath, values) {
    const { files, dirs } = getFilesAndDirs(snippetPath);
    const vars = createVars(values);

    dirs.forEach(dir => {
        const rdyDir = getDestinationPath(dir, vars);

        if (fs.existsSync(rdyDir)) throw `${rdyDir} already exists!`;

        fs.mkdirSync(rdyDir);
    });

    files.forEach(file => {
        const rdyFile = getDestinationPath(file, vars);

        const created = copyFileWithTransform(file, rdyFile, content =>
            renderFile(content, vars),
        );

        if (created) {
            console.log(chalk`${rdyFile} {green.bold ✔}`);
        } else {
            console.log(chalk`${rdyFile} {gray.bold ✘}`);
        }
    });

    removeEmptyDirs(getDestinationPath(snippetPath, vars));
}

module.exports = createSnippet;
