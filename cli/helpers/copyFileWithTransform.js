'use strict';

const fs = require('fs');
const { trim } = require('lodash');

function copyFileWithTransform(fromPath, toPath, transform) {
    const content = fs.readFileSync(fromPath, 'utf8');

    const transformedContent = transform(content);

    if (!trim(transformedContent)) {
        return false;
    }

    fs.writeFileSync(toPath, transformedContent);
    return true;
}

module.exports = copyFileWithTransform;
