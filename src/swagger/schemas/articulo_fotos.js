module.exports = {
    ArticuloFoto: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            url_foto: {
                type: 'string',
                example: 'https://ejemplo.com/fotos/articulo-1.jpg',
                description: 'URL de la imagen del artículo',
            },
            principal: {
                type: 'integer',
                enum: [0, 1],
                example: 1,
                description: '1 = foto principal del artículo, 0 = foto secundaria',
            },
            articulos_id: {
                type: 'integer',
                example: 12,
                description: 'ID del artículo al que pertenece la foto',
            },
        },
    },
    ArticuloFotoRequest: {
        type: 'object',
        required: ['url_foto', 'principal', 'articulos_id'],
        properties: {
            url_foto: {
                type: 'string',
                example: 'https://ejemplo.com/fotos/articulo-1.jpg',
            },
            principal: {
                type: 'integer',
                enum: [0, 1],
                example: 1,
            },
            articulos_id: {
                type: 'integer',
                example: 12,
            },
        },
    },
    ArticuloFotoCreateResponse: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            mensaje: { type: 'string', example: 'Foto creada correctamente' },
        },
    },
    ArticuloFotoMensajeResponse: {
        type: 'object',
        properties: {
            mensaje: { type: 'string', example: 'Foto actualizada correctamente' },
        },
    },
};
