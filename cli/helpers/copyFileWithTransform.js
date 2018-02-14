'use strict';

const fs = require('fs');

function copyFileWithTransform(fromPath, toPath, transform, rdy = null) {
    fs.readFile(fromPath, 'utf8', (err, content) => {
        if (err) throw err;

        fs.writeFile(toPath, transform(content), err => {
            if (err) throw err;
            rdy && rdy(toPath);
        });
    });
}

module.exports = copyFileWithTransform;
