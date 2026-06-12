const pool = require('../db');

// GET /articulos
const getArticulos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM articulos');

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los artículos',
            error: error.message,
        });
    }
};

// GET /articulos/:id
const getArticuloById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            'SELECT * FROM articulos WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                mensaje: 'Artículo no encontrado',
            });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener el artículo',
            error: error.message,
        });
    }
};

// POST /articulos
const createArticulo = async (req, res) => {
    try {
        const {
            usuarios_id,
            titulo,
            descripcion,
            categorias_id,
            precio,
            estado_conservacion_id,
            estado_articulo_id,
        } = req.body;

        if (
            !usuarios_id ||
            !titulo ||
            !descripcion ||
            !categorias_id ||
            precio === undefined ||
            !estado_conservacion_id ||
            !estado_articulo_id
        ) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios',
            });
        }

        const [result] = await pool.query(
            `INSERT INTO articulos
            (
                usuarios_id,
                titulo,
                descripcion,
                categorias_id,
                precio,
                estado_conservacion_id,
                estado_articulo_id
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                usuarios_id,
                titulo,
                descripcion,
                categorias_id,
                precio,
                estado_conservacion_id,
                estado_articulo_id,
            ]
        );

        res.status(201).json({
            mensaje: 'Artículo creado correctamente',
            id: result.insertId,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear el artículo',
            error: error.message,
        });
    }
};

// PUT /articulos/:id
const updateArticulo = async (req, res) => {
    try {
        const { id } = req.params;

        const [
            articuloExistente,
        ] = await pool.query('SELECT id FROM articulos WHERE id = ?', [id]);

        if (articuloExistente.length === 0) {
            return res.status(404).json({
                mensaje: 'Artículo no encontrado',
            });
        }

        const {
            usuarios_id,
            titulo,
            descripcion,
            categorias_id,
            precio,
            estado_conservacion_id,
            estado_articulo_id,
        } = req.body;

        await pool.query(
            `UPDATE articulos
             SET
                usuarios_id = ?,
                titulo = ?,
                descripcion = ?,
                categorias_id = ?,
                precio = ?,
                estado_conservacion_id = ?,
                estado_articulo_id = ?,
                updated_at = NOW()
             WHERE id = ?`,
            [
                usuarios_id,
                titulo,
                descripcion,
                categorias_id,
                precio,
                estado_conservacion_id,
                estado_articulo_id,
                id,
            ]
        );

        res.status(200).json({
            mensaje: 'Artículo actualizado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar el artículo',
            error: error.message,
        });
    }
};

// DELETE /articulos/:id
const deleteArticulo = async (req, res) => {
    try {
        const { id } = req.params;

        const [
            articuloExistente,
        ] = await pool.query('SELECT id FROM articulos WHERE id = ?', [id]);

        if (articuloExistente.length === 0) {
            return res.status(404).json({
                mensaje: 'Artículo no encontrado',
            });
        }

        await pool.query('DELETE FROM articulos WHERE id = ?', [id]);

        res.status(200).json({
            mensaje: 'Artículo eliminado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el artículo',
            error: error.message,
        });
    }
};

module.exports = {
    getArticulos,
    getArticuloById,
    createArticulo,
    updateArticulo,
    deleteArticulo,
};