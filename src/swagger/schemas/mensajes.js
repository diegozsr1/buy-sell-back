module.exports = {
    Mensaje: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            conversaciones_id: { type: 'integer', example: 4 },
            receptor_id: { type: 'integer', example: 2 },
            emisor_id: { type: 'integer', example: 5 },
            mensaje: { type: 'string', example: '¿Sigue disponible el artículo?' },
            leido: { type: 'integer', enum: [0, 1], example: 0 },
            enviado_en: { type: 'string', format: 'date-time' },
        },
    },
    MensajeCreateResponse: {
        type: 'object',
        properties: {
            mensaje: { type: 'string', example: 'Mensaje enviado correctamente' },
            data: { $ref: '#/components/schemas/Mensaje' },
        },
    },
};
