const prepareCases = require('../helpers/prepareCases');

function createVars(values) {
    const names = prepareCases('some name', values.name);
    return {
        ...values,
        ...names,
    };
}

module.exports = createVars;
