module.exports = {
    Usuario: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            nombre: { type: 'string', example: 'Juan' },
            apellidos: { type: 'string', example: 'García López' },
            username: { type: 'string', example: 'juangl' },
            email: { type: 'string', format: 'email', example: 'usuario@ejemplo.com' },
            foto: { type: 'string', nullable: true, example: null },
            roles_id: {
                type: 'string',
                enum: ['Usuario', 'Moderador', 'Administrador'],
                example: 'Usuario',
            },
            direccion: { type: 'string', nullable: true, example: null },
            zona_geografica: { type: 'string', nullable: true, example: null },
            cp: { type: 'string', nullable: true, example: '08001', pattern: '^\\d{5}$' },
            bloqueado: { type: 'integer', enum: [0, 1], example: 0 },
            created_at: { type: 'string', format: 'date-time' },
        },
    },
    CountResponse: {
        type: 'object',
        properties: {
            count: { type: 'integer', example: 42 },
        },
    },
    UsuarioRequest: {
        type: 'object',
        required: ['nombre', 'apellidos', 'username', 'email', 'password'],
        properties: {
            nombre: { type: 'string', maxLength: 45, example: 'Juan' },
            apellidos: { type: 'string', maxLength: 100, example: 'García López' },
            username: { type: 'string', maxLength: 45, example: 'juangl' },
            email: { type: 'string', format: 'email', maxLength: 100, example: 'usuario@ejemplo.com' },
            password: { type: 'string', minLength: 6, maxLength: 255, format: 'password', example: 'miPassword123' },
            foto: { type: 'string', maxLength: 255, nullable: true, example: null },
            roles_id: {
                type: 'string',
                enum: ['Usuario', 'Moderador', 'Administrador'],
                default: 'Usuario',
                example: 'Usuario',
            },
            direccion: { type: 'string', maxLength: 255, nullable: true, example: null },
            zona_geografica: { type: 'string', maxLength: 100, nullable: true, example: null },
            cp: { type: 'string', nullable: true, example: '08001', pattern: '^\\d{5}$' },
            bloqueado: { type: 'integer', enum: [0, 1], default: 0, example: 0 },
        },
    },
    DeleteUsuarioResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Usuario eliminado correctamente' },
        },
    },
};
