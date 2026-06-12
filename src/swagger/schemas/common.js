module.exports = {
    ValidationError: {
        type: 'object',
        properties: {
            error: { type: 'string', example: 'Error de validación' },
            detalles: {
                type: 'object',
                additionalProperties: { type: 'string' },
                example: { email: 'El email no es válido' },
            },
        },
    },
    ErrorResponse: {
        type: 'object',
        properties: {
            error: { type: 'string', example: 'Ha habido un error' },
        },
    },
};
