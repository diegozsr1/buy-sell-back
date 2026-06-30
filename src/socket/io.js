const MensajeModel = require('../models/mensajes.model.js');

let io = null;

const setIo = (instance) => {
    io = instance;
};

const getIo = () => io;

const roomConversacion = (conversacionId) => `conversacion:${conversacionId}`;
const roomUsuario = (usuarioId) => `usuario:${usuarioId}`;

const emitMensajeNuevo = async ({ conversacionId, mensaje, receptorId }) => {
    if (!io) return;

    io.to(roomConversacion(conversacionId)).emit('mensaje:nuevo', {
        conversacionId,
        mensaje,
    });

    const total = await MensajeModel.getUnreadCountByUsuario(receptorId);
    io.to(roomUsuario(receptorId)).emit('no-leidos:actualizar', { total });
};

const emitMensajesLeidos = ({ conversacionId, lectorId, emisorId }) => {
    if (!io) return;

    io.to(roomConversacion(conversacionId)).emit('mensajes:leidos', {
        conversacionId,
        lectorId,
    });

    MensajeModel.getUnreadCountByUsuario(emisorId).then((total) => {
        io.to(roomUsuario(emisorId)).emit('no-leidos:actualizar', { total });
    });
};

module.exports = {
    setIo,
    getIo,
    roomConversacion,
    roomUsuario,
    emitMensajeNuevo,
    emitMensajesLeidos,
};
