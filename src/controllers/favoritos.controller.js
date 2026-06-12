const pool = require('../db');

// GET /favoritos
const getFavoritos = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM favoritos'
        );

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

        const [rows] = await pool.query(
            'SELECT * FROM favoritos WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Favorito no encontrado',
            });
        }

        res.status(200).json(rows[0]);
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

        const [result] = await pool.query(
            `INSERT INTO favoritos
            (usuarios_id, articulos_id)
            VALUES (?, ?)`,
            [usuarios_id, articulos_id]
        );

        res.status(201).json({
            mensaje: 'Favorito creado correctamente',
            id: result.insertId,
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

        const [favoritoExistente] = await pool.query(
            'SELECT id FROM favoritos WHERE id = ?',
            [id]
        );

        if (favoritoExistente.length === 0) {
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

        await pool.query(
            `UPDATE favoritos
             SET usuarios_id = ?,
                 articulos_id = ?
             WHERE id = ?`,
            [usuarios_id, articulos_id, id]
        );

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

        const [favoritoExistente] = await pool.query(
            'SELECT id FROM favoritos WHERE id = ?',
            [id]
        );

        if (favoritoExistente.length === 0) {
            return res.status(404).json({
                mensaje: 'Favorito no encontrado',
            });
        }

        await pool.query(
            'DELETE FROM favoritos WHERE id = ?',
            [id]
        );

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
    getFavoritoById,
    createFavorito,
    updateFavorito,
    deleteFavorito,
};