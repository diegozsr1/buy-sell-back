const ArticuloModel = require('../models/articulos.model.js');
const { articuloUsuarioIdSchema } = require('../schemas/articulos.schema.js');

const validationOptions = { abortEarly: false, stripUnknown: true };

const handleValidationError = (error, res) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            detalles: error.errors,
        });
    }
    return null;
};

// GET /articulos
const getArticulos = async (req, res) => {
    try {
        const rows = await ArticuloModel.getAll();
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
        const articulo = await ArticuloModel.getById(id);

        if (!articulo) {
            return res.status(404).json({
                mensaje: 'Artículo no encontrado',
            });
        }

        res.status(200).json(articulo);
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

        const resultado = await ArticuloModel.create({
            usuarios_id,
            titulo,
            descripcion,
            categorias_id,
            precio,
            estado_conservacion_id,
            estado_articulo_id,
        });

        res.status(201).json({
            mensaje: 'Artículo creado correctamente',
            id: resultado.id,
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
        const articuloExistente = await ArticuloModel.getById(id);

        if (!articuloExistente) {
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

        await ArticuloModel.update(id, {
            usuarios_id,
            titulo,
            descripcion,
            categorias_id,
            precio,
            estado_conservacion_id,
            estado_articulo_id,
        });

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
        const articuloExistente = await ArticuloModel.getById(id);

        if (!articuloExistente) {
            return res.status(404).json({
                mensaje: 'Artículo no encontrado',
            });
        }

        await ArticuloModel.deleteById(id);

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

const getArticulosPublicadosByUsuario = async (req, res) => {
    try {
        const { usuarioId } = await articuloUsuarioIdSchema.validate(req.params, validationOptions);
        const resultado = await ArticuloModel.countPublicadosByUsuarioId(usuarioId);
        res.status(200).json(resultado);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({
            mensaje: 'Error al obtener los artículos publicados',
            error: error.message,
        });
    }
};

module.exports = {
    getArticulos,
    getArticuloById,
    getArticulosPublicadosByUsuario,
    createArticulo,
    updateArticulo,
    deleteArticulo,
};
