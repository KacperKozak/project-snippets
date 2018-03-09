'use strict';

const fs = require('fs');
const glob = require('glob');
const ejs = require('ejs');
const chalk = require('chalk');
const { trimEnd } = require('lodash');

const prepareCases = require('./helpers/prepareCases');
const replaceFileVars = require('./helpers/replaceFileVars');
const createSnippet = require('./createSnippet');
const dryRun = require('./dryRun');

function prepareSnippet(snippetPath, values, options) {
    if (!fs.lstatSync(snippetPath).isDirectory()) {
        throw `Snippet [${snippetPath}] is a file, all snippets should be a directory with .snippet on end!`;
    }

    const files = glob.sync(snippetPath + '**/*.tpl');
    const dirs = glob.sync(snippetPath + '*/**/');
    const names = prepareCases('some name', values.name);

    if (!files.length) {
        throw chalk.red`No files found with the extension .tpl in ${snippetPath}`;
    }

    if (options.dryRun) {
        return dryRun(snippetPath, values, options);
    }

    return createSnippet(snippetPath, values, options);
}

module.exports = prepareSnippet;
