#!/usr/bin/env node
'use strict';

const caporal = require('caporal');
const inquirer = require('inquirer');
const glob = require('glob');
const pkg = require('../package.json');

const snippetsList = glob.sync('./.snippets/**/*.tpl');

caporal
    .version(pkg.version)
    .command('create', 'Create file(s) from snippet')
    .action(function(args, options, logger) {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'theme',
                    message: 'What do you want to do?',
                    choices: snippetsList,
                },
                {
                    type: 'input',
                    name: 'name',
                    message: 'Name',
                },
            ])
            .then(answers => {
                console.log(JSON.stringify(answers, null, '  '));
            });
    });

caporal.parse(process.argv);
