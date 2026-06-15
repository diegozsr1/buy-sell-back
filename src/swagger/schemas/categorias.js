module.exports = {
    Categoria: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nombre: { type: 'string', example: 'Electrónica' },
            descripcion: { type: 'string', example: 'Artículos electrónicos y gadgets' },
        },
    },
    CategoriaRequest: {
        type: 'object',
        required: ['nombre', 'descripcion'],
        properties: {
            nombre: { type: 'string', maxLength: 45, example: 'Electrónica' },
            descripcion: { type: 'string', maxLength: 255, example: 'Artículos electrónicos y gadgets' },
        },
    },
};
