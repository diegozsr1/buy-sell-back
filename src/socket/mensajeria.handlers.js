const {
    enviarMensaje,
    marcarConversacionLeida,
} = require('../services/mensajes-envio.service.js');
const { assertParticipante } = require('../services/mensajeria.service.js');
const {
    roomConversacion,
    roomUsuario,
    emitMensajeNuevo,
    emitMensajesLeidos,
} = require('./io.js');

const registerMensajeriaHandlers = (io, socket) => {
    const usuarioId = socket.usuario.id;

    socket.join(roomUsuario(usuarioId));

    socket.on('conversacion:unirse', async (payload, ack) => {
        try {
            const conversacionId = Number(payload?.conversacionId);
            if (!conversacionId) {
                throw new Error('conversacionId es obligatorio');
            }

            await assertParticipante(conversacionId, usuarioId);
            socket.join(roomConversacion(conversacionId));

            if (typeof ack === 'function') {
                ack({ ok: true });
            }
        } catch (error) {
            if (typeof ack === 'function') {
                ack({ ok: false, error: error.message });
            }
        }
    });

    socket.on('conversacion:salir', (payload) => {
        const conversacionId = Number(payload?.conversacionId);
        if (!conversacionId) return;
        socket.leave(roomConversacion(conversacionId));
    });

    socket.on('conversacion:leer', async (payload, ack) => {
        try {
            const conversacionId = Number(payload?.conversacionId);
            if (!conversacionId) {
                throw new Error('conversacionId es obligatorio');
            }

            const participantes = await assertParticipante(conversacionId, usuarioId);
            await marcarConversacionLeida({ conversacionId, usuarioId });

            const otroUsuarioId =
                Number(participantes.comprador_id) === Number(usuarioId)
                    ? Number(participantes.vendedor_id)
                    : Number(participantes.comprador_id);

            emitMensajesLeidos({
                conversacionId,
                lectorId: usuarioId,
                emisorId: otroUsuarioId,
            });

            if (typeof ack === 'function') {
                ack({ ok: true });
            }
        } catch (error) {
            if (typeof ack === 'function') {
                ack({ ok: false, error: error.message });
            }
        }
    });

    socket.on('mensaje:enviar', async (payload, ack) => {
        try {
            const conversacionId = Number(payload?.conversacionId);
            const mensaje = payload?.mensaje;

            const resultado = await enviarMensaje({
                conversacionId,
                emisorId: usuarioId,
                mensaje,
            });

            await emitMensajeNuevo({
                conversacionId: resultado.conversacionId,
                mensaje: resultado.mensajeCreado,
                receptorId: resultado.receptorId,
            });

            if (typeof ack === 'function') {
                ack({ ok: true, data: resultado.mensajeCreado });
            }
        } catch (error) {
            if (typeof ack === 'function') {
                ack({
                    ok: false,
                    error: error.message,
                    statusCode: error.statusCode || 500,
                });
            }
        }
    });
};

module.exports = {
    registerMensajeriaHandlers,
};
