const ConversacionModel = require('../models/conversaciones.model.js');
const MensajeModel = require('../models/mensajes.model.js');
const {
    assertParticipante,
    assertParticipantePedido,
} = require('../services/mensajeria.service.js');
const {
    enviarMensaje,
    marcarConversacionLeida,
} = require('../services/mensajes-envio.service.js');
const { emitMensajeNuevo, emitMensajesLeidos } = require('../socket/io.js');
const {
    conversacionIdSchema,
    pedidoIdParamSchema,
    mensajeCreateSchema,
} = require('../schemas/mensajeria.schema.js');

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

const getMisConversaciones = async (req, res) => {
    try {
        const conversaciones = await ConversacionModel.getByUsuarioId(req.usuario.id);
        res.status(200).json(conversaciones);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener las conversaciones',
            error: error.message,
        });
    }
};

const getNoLeidosCount = async (req, res) => {
    try {
        const total = await MensajeModel.getUnreadCountByUsuario(req.usuario.id);
        res.status(200).json({ total });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los mensajes no leídos',
            error: error.message,
        });
    }
};

const getConversacionByPedidoId = async (req, res) => {
    try {
        const { pedidoId } = await pedidoIdParamSchema.validate(
            req.params,
            validationOptions
        );

        await assertParticipantePedido(pedidoId, req.usuario.id);

        const conversacion = await ConversacionModel.getByPedidoId(pedidoId);
        if (!conversacion) {
            return res.status(404).json({
                mensaje: 'Conversación no encontrada para este pedido',
            });
        }

        res.status(200).json(conversacion);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;

        const serviceResponse = handleServiceError(error, res);
        if (serviceResponse) return serviceResponse;

        res.status(500).json({
            mensaje: 'Error al obtener la conversación',
            error: error.message,
        });
    }
};

const getConversacionById = async (req, res) => {
    try {
        const { id } = await conversacionIdSchema.validate(
            req.params,
            validationOptions
        );

        await assertParticipante(id, req.usuario.id);

        const conversacion = await ConversacionModel.getById(id);
        if (!conversacion) {
            return res.status(404).json({
                mensaje: 'Conversación no encontrada',
            });
        }

        res.status(200).json(conversacion);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;

        const serviceResponse = handleServiceError(error, res);
        if (serviceResponse) return serviceResponse;

        res.status(500).json({
            mensaje: 'Error al obtener la conversación',
            error: error.message,
        });
    }
};

const getMensajesByConversacion = async (req, res) => {
    try {
        const { id } = await conversacionIdSchema.validate(
            req.params,
            validationOptions
        );

        const participantes = await assertParticipante(id, req.usuario.id);

        const mensajes = await MensajeModel.getByConversacionId(id);
        await marcarConversacionLeida({ conversacionId: id, usuarioId: req.usuario.id });

        const otroUsuarioId =
            Number(participantes.comprador_id) === Number(req.usuario.id)
                ? Number(participantes.vendedor_id)
                : Number(participantes.comprador_id);

        emitMensajesLeidos({
            conversacionId: id,
            lectorId: req.usuario.id,
            emisorId: otroUsuarioId,
        });

        res.status(200).json(mensajes);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;

        const serviceResponse = handleServiceError(error, res);
        if (serviceResponse) return serviceResponse;

        res.status(500).json({
            mensaje: 'Error al obtener los mensajes',
            error: error.message,
        });
    }
};

const createMensajeInConversacion = async (req, res) => {
    try {
        const { id } = await conversacionIdSchema.validate(
            req.params,
            validationOptions
        );
        const { mensaje } = await mensajeCreateSchema.validate(
            req.body,
            validationOptions
        );

        const resultado = await enviarMensaje({
            conversacionId: id,
            emisorId: req.usuario.id,
            mensaje,
        });

        await emitMensajeNuevo({
            conversacionId: resultado.conversacionId,
            mensaje: resultado.mensajeCreado,
            receptorId: resultado.receptorId,
        });

        res.status(201).json({
            mensaje: 'Mensaje enviado correctamente',
            data: resultado.mensajeCreado,
        });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;

        const serviceResponse = handleServiceError(error, res);
        if (serviceResponse) return serviceResponse;

        res.status(500).json({
            mensaje: 'Error al enviar el mensaje',
            error: error.message,
        });
    }
};

module.exports = {
    getMisConversaciones,
    getNoLeidosCount,
    getConversacionByPedidoId,
    getConversacionById,
    getMensajesByConversacion,
    createMensajeInConversacion,
};
