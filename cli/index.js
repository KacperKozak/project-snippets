#!/usr/bin/env node
'use strict';

const caporal = require('caporal');
const inquirer = require('inquirer');
const glob = require('glob');
const prepareSnippet = require('./prepareSnippet');
const pkg = require('../package.json');

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
    .action(function(args, options, logger) {
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
                const fullPath = snippetsDirList[snippetsList.indexOf(path)];
                prepareSnippet(fullPath, values, options);
            })
            .catch(console.error);
    });

caporal.parse(process.argv);
