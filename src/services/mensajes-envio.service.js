const ConversacionModel = require('../models/conversaciones.model.js');
const MensajeModel = require('../models/mensajes.model.js');
const {
    assertParticipante,
    assertPuedeEnviarMensaje,
    getReceptorId,
} = require('./mensajeria.service.js');
const { mensajeCreateSchema } = require('../schemas/mensajeria.schema.js');

const validationOptions = { abortEarly: false, stripUnknown: true };

const enviarMensaje = async ({ conversacionId, emisorId, mensaje }) => {
    const { mensaje: texto } = await mensajeCreateSchema.validate(
        { mensaje },
        validationOptions
    );

    const participantes = await assertParticipante(conversacionId, emisorId);
    assertPuedeEnviarMensaje(participantes);

    const receptorId = getReceptorId(participantes, emisorId);
    if (!receptorId) {
        const error = new Error('No puedes enviar mensajes en esta conversación');
        error.statusCode = 403;
        throw error;
    }

    const resultado = await MensajeModel.create({
        conversaciones_id: conversacionId,
        emisor_id: emisorId,
        receptor_id: receptorId,
        mensaje: texto,
    });

    await ConversacionModel.touchUpdatedAt(conversacionId);

    const mensajeCreado = await MensajeModel.getById(resultado.id);

    return {
        mensajeCreado,
        receptorId,
        conversacionId,
    };
};

const marcarConversacionLeida = async ({ conversacionId, usuarioId }) => {
    await assertParticipante(conversacionId, usuarioId);
    await MensajeModel.markAsReadByConversacion(conversacionId, usuarioId);
};

module.exports = {
    enviarMensaje,
    marcarConversacionLeida,
};
