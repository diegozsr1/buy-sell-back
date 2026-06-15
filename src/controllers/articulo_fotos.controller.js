const pool = require('../db');

// GET /articulo_fotos
const getArticuloFotos = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM articulo_fotos'
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /articulo_fotos/:id
const getArticuloFotoById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            'SELECT * FROM articulo_fotos WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Foto no encontrada'
            });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /articulo_fotos
const createArticuloFoto = async (req, res) => {
    try {
        const { url_foto, principal, articulos_id } = req.body;

        const [result] = await pool.query(
            `INSERT INTO articulo_fotos
            (url_foto, principal, articulos_id)
            VALUES (?, ?, ?)`,
            [url_foto, principal, articulos_id]
        );

        res.status(201).json({
            id: result.insertId,
            mensaje: 'Foto creada correctamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT /articulo_fotos/:id
const updateArticuloFoto = async (req, res) => {
    try {
        const { id } = req.params;
        const { url_foto, principal, articulos_id } = req.body;

        await pool.query(
            `UPDATE articulo_fotos
             SET url_foto = ?, principal = ?, articulos_id = ?
             WHERE id = ?`,
            [url_foto, principal, articulos_id, id]
        );

        res.json({
            mensaje: 'Foto actualizada correctamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE /articulo_fotos/:id
const deleteArticuloFoto = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            'DELETE FROM articulo_fotos WHERE id = ?',
            [id]
        );

        res.json({
            mensaje: 'Foto eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getArticuloFotos,
    getArticuloFotoById,
    createArticuloFoto,
    updateArticuloFoto,
    deleteArticuloFoto,
};