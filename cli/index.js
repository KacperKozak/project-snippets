#!/usr/bin/env node
'use strict';

const caporal = require('caporal');
const inquirer = require('inquirer');
const glob = require('glob');
const createSnippet = require('./createSnippet');
const pkg = require('../package.json');

const snippetsList = glob.sync('./.snippets/**/*.snippet/');

console.log(snippetsList);

caporal
    .command('create', 'Create file(s) from snippet')
    .action(function(args, options, logger) {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'path',
                    message: 'What do you want to do?',
                    choices: snippetsList,
                    transformer: path => path.match(/^\.\/\.snippets\/(.+)\.snippet/)[1],
                },
                {
                    type: 'input',
                    name: 'name',
                    message: 'Name',
                },
            ])
            .then(({ path, ...options }) => {
                createSnippet(path, options);
            })
            .catch(console.error);
    });

caporal.parse(process.argv);
