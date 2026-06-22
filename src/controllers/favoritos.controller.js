const FavoritoModel = require('../models/favoritos.model.js');

// GET /favoritos
const getFavoritos = async (req, res) => {
    try {
        const rows = await FavoritoModel.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los favoritos',
            error: error.message,
        });
    }
};

const getFavoritosByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const rows = await FavoritoModel.getAllByUser(user_id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los favoritos',
            error: error.message,
        });
    }
};

// GET /favoritos/:id
const getFavoritoById = async (req, res) => {
    try {
        const { id } = req.params;
        const favorito = await FavoritoModel.getById(id);

        if (!favorito) {
            return res.status(404).json({
                mensaje: 'Favorito no encontrado',
            });
        }

        res.status(200).json(favorito);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener el favorito',
            error: error.message,
        });
    }
};

// POST /favoritos
const createFavorito = async (req, res) => {
    try {
        const { usuarios_id, articulos_id } = req.body;

        if (!usuarios_id || !articulos_id) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios',
            });
        }

        const resultado = await FavoritoModel.create({
            usuarios_id,
            articulos_id,
        });

        res.status(201).json({
            mensaje: 'Favorito creado correctamente',
            id: resultado.id,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear el favorito',
            error: error.message,
        });
    }
};

// PUT /favoritos/:id
const updateFavorito = async (req, res) => {
    try {
        const { id } = req.params;
        const favoritoExistente = await FavoritoModel.getById(id);

        if (!favoritoExistente) {
            return res.status(404).json({
                mensaje: 'Favorito no encontrado',
            });
        }

        const { usuarios_id, articulos_id } = req.body;

        if (!usuarios_id || !articulos_id) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios',
            });
        }

        await FavoritoModel.update(id, { usuarios_id, articulos_id });

        res.status(200).json({
            mensaje: 'Favorito actualizado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar el favorito',
            error: error.message,
        });
    }
};

// DELETE /favoritos/:id
const deleteFavorito = async (req, res) => {
    try {
        const { id } = req.params;
        const favoritoExistente = await FavoritoModel.getById(id);

        if (!favoritoExistente) {
            return res.status(404).json({
                mensaje: 'Favorito no encontrado',
            });
        }

        await FavoritoModel.deleteById(id);

        res.status(200).json({
            mensaje: 'Favorito eliminado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el favorito',
            error: error.message,
        });
    }
};

module.exports = {
    getFavoritos,
    getFavoritosByUser,
    getFavoritoById,
    createFavorito,
    updateFavorito,
    deleteFavorito,
};
