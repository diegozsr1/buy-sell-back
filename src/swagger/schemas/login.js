module.exports = {
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
