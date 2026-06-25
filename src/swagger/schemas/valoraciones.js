module.exports = {
    Valoracion: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            usuario_valorador_id: {
                type: 'integer',
                example: 3,
                description: 'ID del usuario que deja la valoración',
            },
            articulos_id: {
                type: 'integer',
                example: 12,
                description: 'ID del artículo valorado',
            },
            puntuacion: {
                type: 'number',
                format: 'float',
                minimum: 0,
                maximum: 5,
                example: 4.5,
                description: 'Puntuación otorgada al artículo',
            },
            mensaje: {
                type: 'string',
                example: 'Muy buen estado y trato excelente.',
                description: 'Comentario asociado a la valoración',
            },
            creada_en: {
                type: 'string',
                format: 'date-time',
                example: '2026-06-15T10:30:00.000Z',
            },
        },
    },
    ValoracionRequest: {
        type: 'object',
        required: ['usuario_valorador_id', 'articulos_id', 'puntuacion', 'mensaje'],
        properties: {
            usuario_valorador_id: {
                type: 'integer',
                example: 3,
            },
            articulos_id: {
                type: 'integer',
                example: 12,
            },
            puntuacion: {
                type: 'number',
                format: 'float',
                minimum: 0,
                maximum: 5,
                example: 4.5,
            },
            mensaje: {
                type: 'string',
                example: 'Muy buen estado y trato excelente.',
            },
        },
    },
    ValoracionCreateResponse: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            mensaje: { type: 'string', example: 'Valoración creada correctamente' },
        },
    },
    ValoracionMensajeResponse: {
        type: 'object',
        properties: {
            mensaje: { type: 'string', example: 'Valoración actualizada correctamente' },
        },
    },
    PromedioValoracionesRecibidasResponse: {
        type: 'object',
        properties: {
            usuario_id: { type: 'integer', example: 5 },
            puntuacion_media: {
                type: 'number',
                format: 'float',
                nullable: true,
                example: 4.5,
                description: 'Promedio de puntuaciones recibidas en los artículos del usuario. Null si no tiene valoraciones.',
            },
            total_valoraciones: {
                type: 'integer',
                example: 12,
                description: 'Número total de valoraciones recibidas en sus artículos.',
            },
        },
    },
    ValoracionPorUsuario: {
        allOf: [
            { $ref: '#/components/schemas/Valoracion' },
            {
                type: 'object',
                properties: {
                    usuarios_id: {
                        type: 'integer',
                        example: 6,
                        description: 'ID del usuario dueño del artículo valorado',
                    },
                    nombre: {
                        type: 'string',
                        example: 'Lucía',
                        description: 'Nombre del usuario que dejó la valoración',
                    },
                    apellidos: {
                        type: 'string',
                        example: 'Ramírez',
                        description: 'Apellidos del usuario que dejó la valoración',
                    },
                    dias_transcurridos: {
                        type: 'integer',
                        example: 3,
                        description: 'Días transcurridos desde la creación de la valoración',
                    },
                },
            },
        ],
    },
};
