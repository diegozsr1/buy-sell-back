const ConversacionModel = require('../models/conversaciones.model.js');

const ESTADOS_SIN_MENSAJES = ['Completado', 'Cancelado'];

const esParticipante = (participantes, usuarioId) => {
    if (!participantes) return false;
    const userId = Number(usuarioId);
    return (
        Number(participantes.comprador_id) === userId ||
        Number(participantes.vendedor_id) === userId
    );
};

const puedeEnviarMensaje = (estadoPedido) =>
    !ESTADOS_SIN_MENSAJES.includes(estadoPedido);

const getReceptorId = (participantes, emisorId) => {
    const emisor = Number(emisorId);
    if (Number(participantes.comprador_id) === emisor) {
        return Number(participantes.vendedor_id);
    }
    if (Number(participantes.vendedor_id) === emisor) {
        return Number(participantes.comprador_id);
    }
    return null;
};

const assertParticipante = async (conversacionId, usuarioId) => {
    const participantes =
        await ConversacionModel.getParticipantesByConversacionId(conversacionId);

    if (!participantes) {
        const error = new Error('Conversación no encontrada');
        error.statusCode = 404;
        throw error;
    }

    if (!esParticipante(participantes, usuarioId)) {
        const error = new Error('No tienes acceso a esta conversación');
        error.statusCode = 403;
        throw error;
    }

    return participantes;
};

const assertParticipantePedido = async (pedidoId, usuarioId) => {
    const participantes =
        await ConversacionModel.getParticipantesByPedidoId(pedidoId);

    if (!participantes) {
        const error = new Error('Pedido no encontrado');
        error.statusCode = 404;
        throw error;
    }

    if (!esParticipante(participantes, usuarioId)) {
        const error = new Error('No tienes acceso a este pedido');
        error.statusCode = 403;
        throw error;
    }

    return participantes;
};

const assertPuedeEnviarMensaje = (participantes) => {
    if (!puedeEnviarMensaje(participantes.pedido_estado)) {
        const error = new Error(
            'No se pueden enviar mensajes en pedidos completados o cancelados'
        );
        error.statusCode = 403;
        throw error;
    }
};

module.exports = {
    ESTADOS_SIN_MENSAJES,
    esParticipante,
    puedeEnviarMensaje,
    getReceptorId,
    assertParticipante,
    assertParticipantePedido,
    assertPuedeEnviarMensaje,
};
