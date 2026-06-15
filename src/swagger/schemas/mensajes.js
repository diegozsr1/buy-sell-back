module.exports = {
    Mensaje: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            conversaciones_id: { type: 'integer', example: 4 },
            receptor_id: { type: 'integer', example: 2 },
            emisor_id: { type: 'integer', example: 5 },
            mensaje: { type: 'string', example: '¿Sigue disponible el artículo?' },
            enviado_en: { type: 'string', format: 'date-time' },
        },
    },
    MensajeRequest: {
        type: 'object',
        required: ['conversaciones_id', 'receptor_id', 'emisor_id', 'mensaje'],
        properties: {
            conversaciones_id: { type: 'integer', example: 4 },
            receptor_id: { type: 'integer', example: 2 },
            emisor_id: { type: 'integer', example: 5 },
            mensaje: { type: 'string', example: '¿Sigue disponible el artículo?' },
        },
    },
};
