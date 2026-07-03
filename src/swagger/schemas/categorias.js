module.exports = {
    Categoria: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nombre: { type: 'string', example: 'Electrónica' },
            descripcion: { type: 'string', example: 'Artículos electrónicos y gadgets' },
            icono: {
                type: 'string',
                nullable: true,
                example: 'https://res.cloudinary.com/djqduukxt/image/upload/v123/categorias/iconos/abc.png',
                description: 'URL del icono almacenado en Cloudinary',
            },
            total_articulos: {
                type: 'integer',
                example: 12,
                description: 'Número de artículos asociados a la categoría',
            },
            estado: {
                type: 'integer',
                enum: [0, 1],
                example: 1,
                description: '1 = activa, 0 = eliminada (borrado lógico)',
            },
        },
    },
    CategoriaRequest: {
        type: 'object',
        required: ['nombre', 'descripcion'],
        properties: {
            nombre: { type: 'string', maxLength: 45, example: 'Electrónica' },
            descripcion: { type: 'string', maxLength: 255, example: 'Artículos electrónicos y gadgets' },
            icono: {
                type: 'string',
                format: 'binary',
                description: 'Archivo de imagen del icono',
            },
        },
    },
};
