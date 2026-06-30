const MensajeModel = require('../models/mensajes.model.js');
const { assertParticipante } = require('../services/mensajeria.service.js');
const { conversacionIdSchema } = require('../schemas/mensajeria.schema.js');

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

const handleServiceError = (error, res) => {
    if (error.statusCode) {
        return res.status(error.statusCode).json({ mensaje: error.message });
    }
    return null;
};

const getMensajeById = async (req, res) => {
    try {
        const { id } = await conversacionIdSchema.validate(
            { id: req.params.id },
            validationOptions
        );

        const mensaje = await MensajeModel.getById(id);
        if (!mensaje) {
            return res.status(404).json({ mensaje: 'Mensaje no encontrado' });
        }

        await assertParticipante(mensaje.conversaciones_id, req.usuario.id);

        res.status(200).json(mensaje);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;

        const serviceResponse = handleServiceError(error, res);
        if (serviceResponse) return serviceResponse;

        res.status(500).json({
            mensaje: 'Error al obtener el mensaje',
            error: error.message,
        });
    }
};

module.exports = {
    getMensajeById,
};
