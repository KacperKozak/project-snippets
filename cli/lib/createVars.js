const prepareCases = require('../helpers/prepareCases');

function createVars(values) {
    const names = prepareCases('some name', values.name);
    return Object.assign({}, values, names);
}

module.exports = createVars;
