const metricaConVariacion = {
    type: 'object',
    properties: {
        total: { type: 'integer', example: 3482 },
        variacion_porcentaje: {
            type: 'integer',
            example: 8,
            description: 'Variación respecto al periodo anterior del mismo tamaño',
        },
    },
};

module.exports = {
    DashboardEstadisticasResponse: {
        type: 'object',
        properties: {
            temporalidad: {
                type: 'string',
                enum: ['1d', '1s', '1m', '6m', '1a', '3a'],
                example: '1m',
            },
            temporalidad_etiqueta: { type: 'string', example: '1 mes' },
            periodo: {
                type: 'object',
                properties: {
                    desde: { type: 'string', format: 'date-time' },
                    hasta: { type: 'string', format: 'date-time' },
                },
            },
            articulos_publicados: metricaConVariacion,
            usuarios_activos: metricaConVariacion,
            reportes_pendientes: {
                type: 'object',
                properties: {
                    total: { type: 'integer', example: 15 },
                    total_reportes: { type: 'integer', example: 23 },
                },
            },
            articulos_vendidos: metricaConVariacion,
            categorias_activas: {
                type: 'object',
                properties: {
                    total: { type: 'integer', example: 7 },
                    etiqueta: { type: 'string', example: 'Catálogo completo' },
                },
            },
            articulos_retirados: metricaConVariacion,
        },
    },
};
