const ESTADOS_PEDIDO = ['Pendiente', 'Aceptado', 'Enviado', 'Cancelado', 'Completado'];

module.exports = {
    Pedido: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            comprador_id: { type: 'integer', example: 5 },
            articulos_id: { type: 'integer', example: 12 },
            fecha_pedido: { type: 'string', format: 'date-time' },
            estado: { type: 'string', enum: ESTADOS_PEDIDO, example: 'Pendiente' },
            direccion_envio: { type: 'string', example: 'Calle Mayor 10, Madrid' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
        },
    },
    PedidoRequest: {
        type: 'object',
        required: ['comprador_id', 'articulos_id', 'estado', 'direccion_envio'],
        properties: {
            comprador_id: { type: 'integer', example: 5 },
            articulos_id: { type: 'integer', example: 12 },
            estado: { type: 'string', enum: ESTADOS_PEDIDO, example: 'Pendiente' },
            direccion_envio: { type: 'string', maxLength: 255, example: 'Calle Mayor 10, Madrid' },
        },
    },
    VentasUsuarioResponse: {
        type: 'object',
        properties: {
            usuario_id: { type: 'integer', example: 2 },
            total_ventas: {
                type: 'integer',
                example: 3,
                description: 'Número de pedidos completados de los artículos del usuario.',
            },
            importe_total: {
                type: 'number',
                format: 'float',
                example: 450.75,
                description: 'Suma de precios de los artículos vendidos en pedidos completados.',
            },
        },
    },
};
