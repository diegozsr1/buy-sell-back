const CategoriaModel = require('../models/categorias.model.js');

// GET /categorias
const getCategorias = async (req, res) => {
    try {
        const rows = await CategoriaModel.getAll();
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
        const categoria = await CategoriaModel.getById(id);

        if (!categoria) {
            return res.status(404).json({
                mensaje: 'Categoría no encontrada',
            });
        }

        res.status(200).json(categoria);
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

        const resultado = await CategoriaModel.create({ nombre, descripcion });

        res.status(201).json({
            mensaje: 'Categoría creada correctamente',
            id: resultado.id,
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
        const categoriaExistente = await CategoriaModel.getById(id);

        if (!categoriaExistente) {
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

        await CategoriaModel.update(id, { nombre, descripcion });

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
        const categoriaExistente = await CategoriaModel.getById(id);

        if (!categoriaExistente) {
            return res.status(404).json({
                mensaje: 'Categoría no encontrada',
            });
        }

        await CategoriaModel.deleteById(id);

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
