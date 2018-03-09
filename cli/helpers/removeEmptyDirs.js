const fs = require('fs');
const path = require('path');

function removeEmptyDirs(dir) {
    const isDir = fs.statSync(dir).isDirectory();
    if (!isDir) return;

    let files = fs.readdirSync(dir);

    if (files.length > 0) {
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            removeEmptyDirs(fullPath);
        });

        files = fs.readdirSync(dir);
    }

    if (files.length == 0) {
        fs.rmdirSync(dir);
        return;
    }
}

module.exports = removeEmptyDirs;
