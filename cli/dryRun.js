module.export = 'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const highlight = require('cli-highlight').highlight;

const getFilesAndDirs = require('./helpers/getFilesAndDirs');

const getDestinationPath = require('./lib/getDestinationPath');
const createVars = require('./lib/createVars');
const renderFile = require('./lib/renderFile');

function getExtension(filename) {
    var ext = path.extname(filename || '').split('.');
    return ext[ext.length - 1];
}

function dryRun(snippetPath, values) {
    const { files } = getFilesAndDirs(snippetPath);
    const vars = createVars(values);

    files.forEach(file => {
        const rdyFile = getDestinationPath(file, vars);

        fs.readFile(file, 'utf8', (err, content) => {
            if (err) throw err;

            const rdyContent = renderFile(content, vars);

            console.log('\n');
            console.log(chalk.bold(rdyFile));
            console.log('-'.repeat(70));
            console.log(
                highlight(rdyContent, {
                    language: getExtension(rdyFile),
                    ignoreIllegals: true,
                }),
            );
        });
    });
}

module.exports = dryRun;
