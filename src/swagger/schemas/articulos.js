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
    ArticuloFotoInsertada: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            url_foto: {
                type: 'string',
                example: 'https://res.cloudinary.com/djqduukxt/image/upload/v123/articulos/fotos/abc.jpg',
            },
            principal: {
                type: 'integer',
                enum: [0, 1],
                example: 1,
            },
        },
    },
    ArticuloConFotosRequest: {
        type: 'object',
        required: [
            'usuarios_id',
            'titulo',
            'descripcion',
            'categorias_id',
            'precio',
            'estado_conservacion_id',
            'estado_articulo_id',
            'principal_index',
            'photos',
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
            principal_index: {
                type: 'integer',
                minimum: 0,
                example: 0,
                description: 'Índice de la foto principal dentro del array photos (base 0)',
            },
            photos: {
                type: 'array',
                minItems: 1,
                maxItems: 5,
                items: {
                    type: 'string',
                    format: 'binary',
                },
                description: 'Imágenes del artículo (mínimo 1, máximo 5)',
            },
        },
    },
    ArticuloConFotosCreateResponse: {
        type: 'object',
        properties: {
            mensaje: { type: 'string', example: 'Artículo creado correctamente' },
            id: { type: 'integer', example: 1 },
            fotos: {
                type: 'array',
                items: { $ref: '#/components/schemas/ArticuloFotoInsertada' },
            },
            advertencias: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        index: { type: 'integer', example: 2 },
                        mensaje: { type: 'string', example: 'Error al subir la imagen' },
                    },
                },
                description: 'Imágenes que no se pudieron subir (el artículo se crea con las restantes)',
            },
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
                    cp: {
                        type: 'string',
                        nullable: true,
                        example: '08001',
                        description: 'Código postal del vendedor',
                    },
                    provincia: {
                        type: 'object',
                        nullable: true,
                        properties: {
                            codigo: { type: 'string', example: '08' },
                            nombre: { type: 'string', example: 'Barcelona' },
                        },
                    },
                },
            },
        ],
    },
    ArticulosMasVendidosResponse: {
        type: 'object',
        properties: {
            articulos: {
                type: 'array',
                items: { $ref: '#/components/schemas/ArticuloMasVendido' },
            },
            zona_moda: {
                type: 'object',
                description:
                    'Moda ponderada por total_ventas entre los artículos del ranking (CP y provincia del vendedor)',
                properties: {
                    cp: {
                        type: 'object',
                        nullable: true,
                        properties: {
                            valor: { type: 'string', example: '08001' },
                            total_ventas: { type: 'integer', example: 25 },
                        },
                    },
                    provincia: {
                        type: 'object',
                        nullable: true,
                        properties: {
                            codigo: { type: 'string', example: '08' },
                            nombre: { type: 'string', example: 'Barcelona' },
                            total_ventas: { type: 'integer', example: 40 },
                        },
                    },
                },
            },
        },
    },
};
