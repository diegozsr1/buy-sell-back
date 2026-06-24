const UsuarioFavoritoModel = require('../models/usuarios_favoritos.model.js');
const UsuarioModel = require('../models/usuarios.model.js');

const getUsuariosFavoritosByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const usuarios = await UsuarioFavoritoModel.getByUser(user_id);
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los usuarios favoritos',
            error: error.message,
        });
    }
};

const createUsuarioFavorito = async (req, res) => {
    try {
        const { usuarios_id, usuario_favorito_id } = req.body;

        if (!usuarios_id || !usuario_favorito_id) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios',
            });
        }

        if (Number(usuarios_id) === Number(usuario_favorito_id)) {
            return res.status(400).json({
                mensaje: 'No puedes añadirte a ti mismo como favorito',
            });
        }

        const usuarioFavorito = await UsuarioModel.getById(usuario_favorito_id);
        if (!usuarioFavorito) {
            return res.status(404).json({
                mensaje: 'Usuario favorito no encontrado',
            });
        }

        const resultado = await UsuarioFavoritoModel.create({
            usuarios_id,
            usuario_favorito_id,
        });

        res.status(201).json({
            mensaje: 'Usuario favorito creado correctamente',
            id: resultado.id,
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensaje: 'El usuario ya está en favoritos',
            });
        }

        res.status(500).json({
            mensaje: 'Error al crear el usuario favorito',
            error: error.message,
        });
    }
};

const deleteUsuarioFavorito = async (req, res) => {
    try {
        const { id } = req.params;
        const favoritoExistente = await UsuarioFavoritoModel.getById(id);

        if (!favoritoExistente) {
            return res.status(404).json({
                mensaje: 'Usuario favorito no encontrado',
            });
        }

        await UsuarioFavoritoModel.deleteById(id);

        res.status(200).json({
            mensaje: 'Usuario favorito eliminado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el usuario favorito',
            error: error.message,
        });
    }
};

module.exports = {
    getUsuariosFavoritosByUser,
    createUsuarioFavorito,
    deleteUsuarioFavorito,
};
