module.exports = {
    Conversacion: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            comprador_id: { type: 'integer', example: 5 },
            articulos_id: { type: 'integer', example: 12 },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
        },
    },
    ConversacionRequest: {
        type: 'object',
        required: ['comprador_id', 'articulos_id'],
        properties: {
            comprador_id: { type: 'integer', example: 5 },
            articulos_id: { type: 'integer', example: 12 },
        },
    },
};
