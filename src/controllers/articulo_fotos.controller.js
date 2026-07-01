const ArticuloFotoModel = require('../models/articulo_fotos.model.js');
const { uploadFotoArticulo, deleteImage } = require('../services/cloudinary.service.js');

const getArticuloFotos = async (req, res) => {
    try {
        const rows = await ArticuloFotoModel.getAll();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFotosByArticle = async (req, res) => {
    const { article_id } = req.params;
    try {
        const rows = await ArticuloFotoModel.getAllFhotosByArticle(article_id);
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
        const { principal, articulos_id } = req.body;

        if (!req.file) {
            return res.status(400).json({ mensaje: 'Debe enviar una imagen' });
        }

        if (principal === undefined || !articulos_id) {
            return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
        }

        const url_foto = await uploadFotoArticulo(req.file);
        const resultado = await ArticuloFotoModel.create({
            url_foto,
            principal: Number(principal),
            articulos_id: Number(articulos_id),
        });

        res.status(201).json({
            id: resultado.id,
            url_foto,
            mensaje: 'Foto creada correctamente',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateArticuloFoto = async (req, res) => {
    try {
        const { id } = req.params;
        const fotoExistente = await ArticuloFotoModel.getById(id);

        if (!fotoExistente) {
            return res.status(404).json({ mensaje: 'Foto no encontrada' });
        }

        const { principal, articulos_id } = req.body;

        if (principal === undefined || !articulos_id) {
            return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
        }

        let url_foto = fotoExistente.url_foto;

        if (req.file) {
            if (fotoExistente.url_foto) {
                await deleteImage(fotoExistente.url_foto);
            }
            url_foto = await uploadFotoArticulo(req.file);
        }

        await ArticuloFotoModel.update(id, {
            url_foto,
            principal: Number(principal),
            articulos_id: Number(articulos_id),
        });

        res.json({
            url_foto,
            mensaje: 'Foto actualizada correctamente',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteArticuloFoto = async (req, res) => {
    try {
        const { id } = req.params;
        const fotoExistente = await ArticuloFotoModel.getById(id);

        if (!fotoExistente) {
            return res.status(404).json({ mensaje: 'Foto no encontrada' });
        }

        if (fotoExistente.url_foto) {
            await deleteImage(fotoExistente.url_foto);
        }

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
    getFotosByArticle,
    getArticuloFotoById,
    createArticuloFoto,
    updateArticuloFoto,
    deleteArticuloFoto,
    getFotosByArticuloId,
};
