// Server creation and configuration
const http = require("node:http");
const app = require("./src/app");
const { initSocket } = require("./src/socket");

// Config .env
require("dotenv").config();

// Server creation
const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT);

// Listeners
server.on("listening", () => {
    console.log(`Server listening on port ${PORT}`);

    if (process.env.AUTH_BYPASS === 'true' && process.env.NODE_ENV !== 'production') {
        console.warn('⚠ AUTH_BYPASS activo: las rutas protegidas aceptan peticiones sin token');
    }
});

server.on("error", (error) => {
    console.log(error);
});
