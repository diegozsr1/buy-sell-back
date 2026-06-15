const ArticuloFotoModel = require('../models/articulo_fotos.model.js');

// GET /articulo_fotos
const getArticuloFotos = async (req, res) => {
    try {
        const rows = await ArticuloFotoModel.getAll();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET /articulo_fotos/:id
const getArticuloFotoById = async (req, res) => {
    try {
        const { id } = req.params;
        const foto = await ArticuloFotoModel.getById(id);

        if (!foto) {
            return res.status(404).json({
                mensaje: 'Foto no encontrada',
            });
        }

        res.json(foto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST /articulo_fotos
const createArticuloFoto = async (req, res) => {
    try {
        const { url_foto, principal, articulos_id } = req.body;
        const resultado = await ArticuloFotoModel.create({
            url_foto,
            principal,
            articulos_id,
        });

        res.status(201).json({
            id: resultado.id,
            mensaje: 'Foto creada correctamente',
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

        await ArticuloFotoModel.update(id, {
            url_foto,
            principal,
            articulos_id,
        });

        res.json({
            mensaje: 'Foto actualizada correctamente',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE /articulo_fotos/:id
const deleteArticuloFoto = async (req, res) => {
    try {
        const { id } = req.params;
        await ArticuloFotoModel.deleteById(id);

        res.json({
            mensaje: 'Foto eliminada correctamente',
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
