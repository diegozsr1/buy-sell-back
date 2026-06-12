const CategoriaModel = require('../models/categorias.model.js');

const getCategorias = async (req, res) => {
    try {
        const resultado = await CategoriaModel.getAll();

        if (resultado) {
            res.json(resultado);
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const getCategoriaById = async (req, res) => {};

const createCategoria = async (req, res) => {};

const updateCategoria = async (req, res) => {};

const deleteCategoria = async (req, res) => {};

module.exports = {
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
};
