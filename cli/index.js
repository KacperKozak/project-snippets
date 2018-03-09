#!/usr/bin/env node
'use strict';

const caporal = require('caporal');
const inquirer = require('inquirer');
const glob = require('glob');
const chalk = require('chalk');
const prepareSnippet = require('./prepareSnippet');

const snippetsDirList = glob.sync('./.snippets/**/*.snippet/');
const snippetsList = snippetsDirList.map(
    path => path.match(/^\.\/\.snippets\/(.+)\.snippet/)[1],
);

caporal
    .command('create', 'Create file(s) from snippet')
    .option(
        '--dry-run',
        'Show the contents of files without creating them',
        caporal.BOOLEAN,
    )
    .action(function(args, options) {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'path',
                    message: 'What do you want to do?',
                    choices: snippetsList,
                },
                {
                    type: 'input',
                    name: 'name',
                    message: 'Name',
                },
            ])
            .then(({ path, ...values }) => {
                if (!values.name) {
                    console.log(chalk.red`Name is required!`);
                    return process.exit(1);
                }

                const fullPath = snippetsDirList[snippetsList.indexOf(path)];
                prepareSnippet(fullPath, values, options);
            })
            .catch(console.error);
    });

caporal.parse(process.argv);
