const { Server } = require('socket.io');
const { setIo } = require('./io.js');
const { socketAuthMiddleware } = require('./auth.middleware.js');
const { registerMensajeriaHandlers } = require('./mensajeria.handlers.js');

const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CORS_ORIGIN || '*',
            methods: ['GET', 'POST'],
        },
        path: '/socket.io',
    });

    setIo(io);

    io.use(socketAuthMiddleware);

    io.on('connection', (socket) => {
        registerMensajeriaHandlers(io, socket);

        socket.on('disconnect', () => {});
    });

    return io;
};

module.exports = {
    initSocket,
};
