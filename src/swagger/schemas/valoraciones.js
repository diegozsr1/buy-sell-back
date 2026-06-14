module.exports = {
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
};
