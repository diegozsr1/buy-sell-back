module.exports = {
    Conversacion: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            pedidos_id: { type: 'integer', example: 12 },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
        },
    },
    ConversacionMia: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            pedidos_id: { type: 'integer', example: 12 },
            pedido_estado: { type: 'string', example: 'Pendiente' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
            articulo: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 5 },
                    titulo: { type: 'string', example: 'Bicicleta de montaña' },
                },
            },
            otro_usuario: {
                type: 'object',
                properties: {
                    id: { type: 'integer', example: 8 },
                    nombre: { type: 'string', example: 'Ana' },
                    apellidos: { type: 'string', example: 'García' },
                    username: { type: 'string', example: 'ana_g' },
                },
            },
            ultimo_mensaje: { type: 'string', nullable: true, example: '¿Cuándo lo envías?' },
            ultimo_mensaje_en: { type: 'string', format: 'date-time', nullable: true },
            no_leidos: { type: 'integer', example: 2 },
        },
    },
    NoLeidosCountResponse: {
        type: 'object',
        properties: {
            total: { type: 'integer', example: 3 },
        },
    },
    MensajeEnConversacionRequest: {
        type: 'object',
        required: ['mensaje'],
        properties: {
            mensaje: { type: 'string', example: '¿Cuándo lo envías?' },
        },
    },
};
