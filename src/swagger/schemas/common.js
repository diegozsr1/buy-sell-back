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
    MensajeResponse: {
        type: 'object',
        properties: {
            mensaje: { type: 'string', example: 'Operación realizada correctamente' },
        },
    },
    MensajeCreateResponse: {
        type: 'object',
        properties: {
            mensaje: { type: 'string', example: 'Recurso creado correctamente' },
            id: { type: 'integer', example: 1 },
        },
    },
    MensajeErrorResponse: {
        type: 'object',
        properties: {
            mensaje: { type: 'string', example: 'Error al procesar la solicitud' },
            error: { type: 'string', example: 'Detalle del error' },
        },
    },
};
