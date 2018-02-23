module.export = 'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const ejs = require('ejs');
const chalk = require('chalk');
const highlight = require('cli-highlight').highlight;
const { trimEnd } = require('lodash');

const prepareCases = require('./helpers/prepareCases');
const replaceFileVars = require('./helpers/replaceFileVars');
const snippetsToSrcPath = require('./helpers/snippetsToSrcPath');
const getFilesAndDirs = require('./helpers/getFilesAndDirs');

function getExtension(filename) {
    var ext = path.extname(filename || '').split('.');
    return ext[ext.length - 1];
}

function dryRun(snippetPath, values, options) {
    const { files } = getFilesAndDirs(snippetPath);
    const names = prepareCases('some name', values.name);

    files.forEach(file => {
        const srcFile = snippetsToSrcPath(file);
        const noTplFile = trimEnd(srcFile, '.tpl');
        const rdyFile = replaceFileVars(noTplFile, names);

        fs.readFile(file, 'utf8', (err, content) => {
            if (err) throw err;

            const rdyContent = ejs.render(content, names);

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
