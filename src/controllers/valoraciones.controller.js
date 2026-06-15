const ValoracionModel = require('../models/valoraciones.model.js');
const {
    valoracionUsuarioIdSchema,
    valoracionIdSchema,
    valoracionSchema,
} = require('../schemas/valoraciones.schema.js');

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

const getPromedioRecibidasByUsuario = async (req, res) => {
    try {
        const { usuarioId } = await valoracionUsuarioIdSchema.validate(req.params, validationOptions);
        const resultado = await ValoracionModel.getPromedioRecibidasByUsuarioId(usuarioId);
        res.json(resultado);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const getValoraciones = async (req, res) => {
    try {
        const resultado = await ValoracionModel.getAll();
        res.json(resultado);
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const getValoracionById = async (req, res) => {
    try {
        const { id } = await valoracionIdSchema.validate(req.params, validationOptions);
        const resultado = await ValoracionModel.getById(id);

        if (!resultado) {
            return res.status(404).json({ mensaje: 'Valoración no encontrada' });
        }

        res.json(resultado);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const createValoracion = async (req, res) => {
    try {
        const datosValidados = await valoracionSchema.validate(req.body, validationOptions);
        const resultado = await ValoracionModel.create(datosValidados);

        res.status(201).json({
            id: resultado.id,
            mensaje: 'Valoración creada correctamente',
        });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al crear la valoración' });
    }
};

const updateValoracion = async (req, res) => {
    try {
        const { id } = await valoracionIdSchema.validate(req.params, validationOptions);
        const datosValidados = await valoracionSchema.validate(req.body, validationOptions);
        const actualizado = await ValoracionModel.update(id, datosValidados);

        if (!actualizado) {
            return res.status(404).json({ mensaje: 'Valoración no encontrada' });
        }

        res.json({ mensaje: 'Valoración actualizada correctamente' });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al actualizar la valoración' });
    }
};

const deleteValoracion = async (req, res) => {
    try {
        const { id } = await valoracionIdSchema.validate(req.params, validationOptions);
        const eliminado = await ValoracionModel.deleteById(id);

        if (!eliminado) {
            return res.status(404).json({ mensaje: 'Valoración no encontrada' });
        }

        res.json({ mensaje: 'Valoración eliminada correctamente' });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al eliminar la valoración' });
    }
};

module.exports = {
    getPromedioRecibidasByUsuario,
    getValoraciones,
    getValoracionById,
    createValoracion,
    updateValoracion,
    deleteValoracion,
};
