const swaggerJsdoc = require('swagger-jsdoc');
const schemas = require('../swagger/schemas/index');

require('dotenv').config();

const servers = process.env.NODE_ENV === 'production'
    ? [
        {
            url: process.env.API_URL || 'https://buysell-backend-3knc.onrender.com',
            description: 'Servidor de producción',
        },
    ]
    : [
        {
            url: `http://localhost:${process.env.PORT || 3000}`,
            description: 'Servidor de desarrollo',
        },
    ];

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Buy & Sell API',
            version: '1.0.0',
            description: 'API para la aplicación de compra-venta de artículos de segunda mano',
        },
        servers,
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