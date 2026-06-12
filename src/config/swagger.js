const swaggerJsdoc = require('swagger-jsdoc');
const schemas = require('../swagger/schemas/index');

require('dotenv').config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MiWallapop API',
            version: '1.0.0',
            description: 'Tienda online de compra-venta de artículos',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Servidor de desarrollo',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas,
        },
    },
    apis: ['./src/routes/api/login.js', './src/routes/api/usuarios.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
