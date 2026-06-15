const pool = require('../db');

// GET /conversaciones
const getConversaciones = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM conversaciones'
        );

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener las conversaciones',
            error: error.message,
        });
    }
};

// GET /conversaciones/:id
const getConversacionById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            'SELECT * FROM conversaciones WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Conversación no encontrada',
            });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener la conversación',
            error: error.message,
        });
    }
};

// POST /conversaciones
const createConversacion = async (req, res) => {
    try {
        const { comprador_id, articulos_id } = req.body;

        if (!comprador_id || !articulos_id) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios',
            });
        }

        const [result] = await pool.query(
            `INSERT INTO conversaciones
            (comprador_id, articulos_id)
            VALUES (?, ?)`,
            [comprador_id, articulos_id]
        );

        res.status(201).json({
            mensaje: 'Conversación creada correctamente',
            id: result.insertId,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear la conversación',
            error: error.message,
        });
    }
};

// PUT /conversaciones/:id
const updateConversacion = async (req, res) => {
    try {
        const { id } = req.params;

        const [conversacionExistente] = await pool.query(
            'SELECT id FROM conversaciones WHERE id = ?',
            [id]
        );

        if (conversacionExistente.length === 0) {
            return res.status(404).json({
                mensaje: 'Conversación no encontrada',
            });
        }

        const { comprador_id, articulos_id } = req.body;

        if (!comprador_id || !articulos_id) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios',
            });
        }

        await pool.query(
            `UPDATE conversaciones
             SET comprador_id = ?,
                 articulos_id = ?,
                 updated_at = NOW()
             WHERE id = ?`,
            [comprador_id, articulos_id, id]
        );

        res.status(200).json({
            mensaje: 'Conversación actualizada correctamente',
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar la conversación',
            error: error.message,
        });
    }
};

// DELETE /conversaciones/:id
const deleteConversacion = async (req, res) => {
    try {
        const { id } = req.params;

        const [conversacionExistente] = await pool.query(
            'SELECT id FROM conversaciones WHERE id = ?',
            [id]
        );

        if (conversacionExistente.length === 0) {
            return res.status(404).json({
                mensaje: 'Conversación no encontrada',
            });
        }

        await pool.query(
            'DELETE FROM conversaciones WHERE id = ?',
            [id]
        );

        res.status(200).json({
            mensaje: 'Conversación eliminada correctamente',
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar la conversación',
            error: error.message,
        });
    }
};

module.exports = {
    getConversaciones,
    getConversacionById,
    createConversacion,
    updateConversacion,
    deleteConversacion,
};