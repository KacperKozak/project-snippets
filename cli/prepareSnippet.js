'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const inquirer = require('inquirer');

const createSnippet = require('./createSnippet');
const dryRun = require('./dryRun');

const OPTION_FILE_NAME = 'options.json';

function prepareSnippet(snippetPath, values, options) {
    if (!fs.lstatSync(snippetPath).isDirectory()) {
        throw `Snippet [${snippetPath}] is a file, all snippets should be a directory with .snippet on end!`;
    }

    const files = glob.sync(snippetPath + '**/*.tpl');

    if (!files.length) {
        throw chalk.red`No files found with the extension .tpl in ${snippetPath}`;
    }

    const snippetOptionsFile = path.resolve(snippetPath, OPTION_FILE_NAME);
    const snippetOptions = fs.existsSync(snippetOptionsFile)
        ? require(snippetOptionsFile)
        : [];

    inquirer
        .prompt(snippetOptions)
        .then(customValues => {
            const allValues = { ...values, ...customValues };

            if (options.dryRun) {
                return dryRun(snippetPath, allValues, options);
            }

            return createSnippet(snippetPath, allValues, options);
        })
        .catch(console.error);
}

module.exports = prepareSnippet;
