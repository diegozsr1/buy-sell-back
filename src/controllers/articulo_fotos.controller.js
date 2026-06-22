const ArticuloFotoModel = require('../models/articulo_fotos.model.js');

const getArticuloFotos = async (req, res) => {
    try {
        const rows = await ArticuloFotoModel.getAll();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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

const getFotosByArticuloId = async (req, res) => {
    try {
        const { articuloId } = req.params;
        const fotos = await ArticuloFotoModel.getByArticuloId(articuloId);
        res.json(fotos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
    getFotosByArticuloId,
};
