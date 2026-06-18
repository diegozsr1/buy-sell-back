const ESTADOS_CONSERVACION = ['Nuevo', 'Como nuevo', 'Buen estado', 'Usado', 'Dañado'];
const ESTADOS_ARTICULO = ['Borrador', 'Publicado', 'En_revision', 'Retirado', 'Reservado', 'Vendido'];

module.exports = {
    Articulo: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            usuarios_id: { type: 'integer', example: 2 },
            titulo: { type: 'string', example: 'Bicicleta de montaña' },
            descripcion: { type: 'string', example: 'Bicicleta en buen estado, poco uso.' },
            categorias_id: { type: 'integer', example: 3 },
            precio: { type: 'number', format: 'float', example: 250.5 },
            estado_conservacion_id: {
                type: 'string',
                enum: ESTADOS_CONSERVACION,
                example: 'Buen estado',
            },
            estado_articulo_id: {
                type: 'string',
                enum: ESTADOS_ARTICULO,
                example: 'Publicado',
            },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
        },
    },
    ArticuloRequest: {
        type: 'object',
        required: [
            'usuarios_id',
            'titulo',
            'descripcion',
            'categorias_id',
            'precio',
            'estado_conservacion_id',
            'estado_articulo_id',
        ],
        properties: {
            usuarios_id: { type: 'integer', example: 2 },
            titulo: { type: 'string', maxLength: 255, example: 'Bicicleta de montaña' },
            descripcion: { type: 'string', example: 'Bicicleta en buen estado, poco uso.' },
            categorias_id: { type: 'integer', example: 3 },
            precio: { type: 'number', format: 'float', example: 250.5 },
            estado_conservacion_id: {
                type: 'string',
                enum: ESTADOS_CONSERVACION,
                example: 'Buen estado',
            },
            estado_articulo_id: {
                type: 'string',
                enum: ESTADOS_ARTICULO,
                example: 'Publicado',
            },
        },
    },
    ArticulosPublicadosResponse: {
        type: 'object',
        properties: {
            usuario_id: { type: 'integer', example: 2 },
            total_publicados: {
                type: 'integer',
                example: 5,
                description: 'Número de artículos con estado Publicado del usuario.',
            },
        },
    },
    ArticuloMasVendido: {
        allOf: [
            { $ref: '#/components/schemas/Articulo' },
            {
                type: 'object',
                properties: {
                    total_ventas: {
                        type: 'integer',
                        example: 15,
                        description: 'Número de pedidos completados del artículo',
                    },
                },
            },
        ],
    },
};
