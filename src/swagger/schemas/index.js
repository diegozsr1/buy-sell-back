const common = require('./common');
const login = require('./login');
const usuarios = require('./usuarios');
const valoraciones = require('./valoraciones');
const articuloFotos = require('./articulo_fotos');
const articulos = require('./articulos');
const categorias = require('./categorias');
const conversaciones = require('./conversaciones');
const favoritos = require('./favoritos');
const usuariosFavoritos = require('./usuarios_favoritos');
const mensajes = require('./mensajes');
const pedidos = require('./pedidos');
const reportes = require('./reportes');
const estadisticas = require('./estadisticas');

module.exports = {
    ...common,
    ...login,
    ...usuarios,
    ...valoraciones,
    ...articuloFotos,
    ...articulos,
    ...categorias,
    ...conversaciones,
    ...favoritos,
    ...usuariosFavoritos,
    ...mensajes,
    ...pedidos,
    ...reportes,
    ...estadisticas,
};
