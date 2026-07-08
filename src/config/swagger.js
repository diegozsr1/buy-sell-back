const swaggerJsdoc = require('swagger-jsdoc');
const schemas = require('../swagger/schemas/index');

require('dotenv').config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Buy & Sell API',
            version: '1.0.0',
            description: 'API para la aplicación de compra-venta de artículos de segunda mano',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Servidor de desarrollo',
            },
        ],
        security: [
            {
                bearerAuth: [],
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
    apis: ['./src/routes/api/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
