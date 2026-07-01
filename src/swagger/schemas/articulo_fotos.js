module.exports = {
    ArticuloFoto: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            url_foto: {
                type: 'string',
                example: 'https://res.cloudinary.com/djqduukxt/image/upload/v123/articulos/fotos/abc.jpg',
                description: 'URL de la imagen almacenada en Cloudinary',
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
        required: ['photo', 'principal', 'articulos_id'],
        properties: {
            photo: {
                type: 'string',
                format: 'binary',
                description: 'Imagen del artículo (se sube a Cloudinary)',
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
            url_foto: {
                type: 'string',
                example: 'https://res.cloudinary.com/djqduukxt/image/upload/v123/articulos/fotos/abc.jpg',
            },
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
