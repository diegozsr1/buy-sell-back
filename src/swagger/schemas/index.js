const common = require('./common');
const login = require('./login');
const usuarios = require('./usuarios');
const valoraciones = require('./valoraciones');
const articuloFotos = require('./articulo_fotos');

module.exports = {
    ...common,
    ...login,
    ...usuarios,
    ...valoraciones,
    ...articuloFotos,
};
