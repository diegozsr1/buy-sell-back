module.exports = {
    Favorito: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            usuarios_id: { type: 'integer', example: 3 },
            articulos_id: { type: 'integer', example: 12 },
            created_at: { type: 'string', format: 'date-time' },
        },
    },
    FavoritoRequest: {
        type: 'object',
        required: ['usuarios_id', 'articulos_id'],
        properties: {
            usuarios_id: { type: 'integer', example: 3 },
            articulos_id: { type: 'integer', example: 12 },
        },
    },
};
