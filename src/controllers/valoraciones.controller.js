const ValoracionModel = require('../models/valoraciones.model.js');
const { valoracionUsuarioIdSchema } = require('../schemas/valoraciones.schema.js');

const validationOptions = { abortEarly: false, stripUnknown: true };

const handleValidationError = (error, res) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            detalles: error.errors
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

const getValoraciones = async (req, res) => {};

const getValoracionById = async (req, res) => {};

const createValoracion = async (req, res) => {};

const updateValoracion = async (req, res) => {};

const deleteValoracion = async (req, res) => {};

module.exports = {
    getPromedioRecibidasByUsuario,
    getValoraciones,
    getValoracionById,
    createValoracion,
    updateValoracion,
    deleteValoracion,
};
