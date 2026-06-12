const common = require('./common');
const login = require('./login');
const usuarios = require('./usuarios');

module.exports = {
    ...common,
    ...login,
    ...usuarios,
};
