'use strict';

const fs = require('fs');
const glob = require('glob');
const chalk = require('chalk');

const createSnippet = require('./createSnippet');
const dryRun = require('./dryRun');

function prepareSnippet(snippetPath, values, options) {
    if (!fs.lstatSync(snippetPath).isDirectory()) {
        throw `Snippet [${snippetPath}] is a file, all snippets should be a directory with .snippet on end!`;
    }

    const files = glob.sync(snippetPath + '**/*.tpl');

    if (!files.length) {
        throw chalk.red`No files found with the extension .tpl in ${snippetPath}`;
    }

    if (options.dryRun) {
        return dryRun(snippetPath, values, options);
    }

    return createSnippet(snippetPath, values, options);
}

module.exports = prepareSnippet;
