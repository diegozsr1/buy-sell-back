const common = require('./common');
const login = require('./login');
const usuarios = require('./usuarios');
const valoraciones = require('./valoraciones');

module.exports = {
    ...common,
    ...login,
    ...usuarios,
    ...valoraciones,
};
