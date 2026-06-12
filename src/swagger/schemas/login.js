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
            cp: { type: 'integer', nullable: true, example: null },
            bloqueado: { type: 'integer', enum: [0, 1], example: 0 },
            created_at: { type: 'string', format: 'date-time' },
        },
    },
    LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: {
                type: 'string',
                format: 'email',
                maxLength: 100,
                example: 'usuario@ejemplo.com',
            },
            password: {
                type: 'string',
                minLength: 6,
                maxLength: 255,
                format: 'password',
                example: 'miPassword123',
            },
        },
    },
    LoginResponse: {
        type: 'object',
        properties: {
            message: { type: 'string', example: 'Inicio de sesión exitoso' },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            usuario: { $ref: '#/components/schemas/Usuario' },
        },
    },
};
