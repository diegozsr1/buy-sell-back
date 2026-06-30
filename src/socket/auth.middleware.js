const {
    isAuthBypassEnabled,
    resolveUsuario,
} = require('../middleware/auth.middleware.js');

const socketAuthMiddleware = async (socket, next) => {
    try {
        const token =
            socket.handshake.auth?.token ||
            socket.handshake.headers?.authorization?.split(' ')[1];

        const user = await resolveUsuario({ token, allowBypass: true });

        if (!user) {
            if (!token) {
                return next(new Error('No se proporcionó un token de autenticación'));
            }
            return next(new Error('Token de autenticación inválido'));
        }

        socket.usuario = user;
        next();
    } catch (error) {
        next(new Error('Token de autenticación inválido'));
    }
};

module.exports = {
    socketAuthMiddleware,
    isAuthBypassEnabled,
};
