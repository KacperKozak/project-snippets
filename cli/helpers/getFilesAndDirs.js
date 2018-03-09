const glob = require('glob');
const chalk = require('chalk');

function getFilesAndDirs(snippetPath) {
    const files = glob.sync(snippetPath + '**/*.tpl');
    const dirs = glob.sync(snippetPath + '*/**/');

    if (!files.length) {
        throw chalk.red`No files found with the extension .tpl in ${snippetPath}`;
    }

    return { files, dirs };
}

module.exports = getFilesAndDirs;
