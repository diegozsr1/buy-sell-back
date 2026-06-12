const pool = require('../db');

// GET /categorias
const getCategorias = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM categorias'
        );

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener las categorías',
            error: error.message,
        });
    }
};

// GET /categorias/:id
const getCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            'SELECT * FROM categorias WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Categoría no encontrada',
            });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener la categoría',
            error: error.message,
        });
    }
};

// POST /categorias
const createCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios',
            });
        }

        const [result] = await pool.query(
            `INSERT INTO categorias (nombre, descripcion)
             VALUES (?, ?)`,
            [nombre, descripcion]
        );

        res.status(201).json({
            mensaje: 'Categoría creada correctamente',
            id: result.insertId,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear la categoría',
            error: error.message,
        });
    }
};

// PUT /categorias/:id
const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const [categoriaExistente] = await pool.query(
            'SELECT id FROM categorias WHERE id = ?',
            [id]
        );

        if (categoriaExistente.length === 0) {
            return res.status(404).json({
                mensaje: 'Categoría no encontrada',
            });
        }

        const { nombre, descripcion } = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios',
            });
        }

        await pool.query(
            `UPDATE categorias
             SET nombre = ?, descripcion = ?
             WHERE id = ?`,
            [nombre, descripcion, id]
        );

        res.status(200).json({
            mensaje: 'Categoría actualizada correctamente',
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar la categoría',
            error: error.message,
        });
    }
};

// DELETE /categorias/:id
const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const [categoriaExistente] = await pool.query(
            'SELECT id FROM categorias WHERE id = ?',
            [id]
        );

        if (categoriaExistente.length === 0) {
            return res.status(404).json({
                mensaje: 'Categoría no encontrada',
            });
        }

        await pool.query(
            'DELETE FROM categorias WHERE id = ?',
            [id]
        );

        res.status(200).json({
            mensaje: 'Categoría eliminada correctamente',
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar la categoría',
            error: error.message,
        });
    }
};

module.exports = {
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
};