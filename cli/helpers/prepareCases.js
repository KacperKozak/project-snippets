const { camelCase, pascalCase, snakeCase, paramCase } = require('change-case');

function prepareCases(key, value) {
    return {
        [camelCase(key)]: camelCase(value),
        [pascalCase(key)]: pascalCase(value),
        [snakeCase(key)]: snakeCase(value),
        [paramCase(key)]: paramCase(value),
        [constantCase(key)]: constantCase(value),
    };
}

module.exports = prepareCases;
