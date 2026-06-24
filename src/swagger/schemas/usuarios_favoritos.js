module.exports = {
    UsuarioFavorito: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            usuarios_id: {
                type: 'integer',
                example: 3,
                description: 'ID del usuario que guarda el favorito',
            },
            usuario_favorito_id: {
                type: 'integer',
                example: 6,
                description: 'ID del usuario marcado como favorito',
            },
            created_at: { type: 'string', format: 'date-time' },
        },
    },
    UsuarioFavoritoRequest: {
        type: 'object',
        required: ['usuarios_id', 'usuario_favorito_id'],
        properties: {
            usuarios_id: { type: 'integer', example: 3 },
            usuario_favorito_id: { type: 'integer', example: 6 },
        },
    },
    UsuarioFavoritoListItem: {
        allOf: [
            { $ref: '#/components/schemas/UsuarioFavorito' },
            {
                type: 'object',
                properties: {
                    nombre: { type: 'string', example: 'Lucía' },
                    apellidos: { type: 'string', example: 'Ramírez' },
                    username: { type: 'string', example: 'luciar' },
                    foto: { type: 'string', nullable: true, example: null },
                    cantidad_valoraciones: { type: 'integer', example: 12 },
                    puntuacion: {
                        type: 'number',
                        format: 'float',
                        nullable: true,
                        example: 4.5,
                    },
                },
            },
        ],
    },
};
