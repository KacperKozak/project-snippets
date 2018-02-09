const fs = require('fs');
const ncp = require('ncp');
const glob = require('glob');

function createSnippet(path, options) {
    console.log('createSnippet', path, options);

    const srcPath = path.replace(/^\.\/\.snippets\//, '');
    ncp(path, srcPath);

    if (fs.lstatSync(path).isDirectory()) {
        console.log('isDirectory');
        const files = glob.sync(path + '**/*.tpl');
        console.log(files);
    } else {
        console.log('isFile');
        fs.createReadStream(path).pipe(fs.createWriteStream('newLog.log'));
    }
}

module.exports = createSnippet;
