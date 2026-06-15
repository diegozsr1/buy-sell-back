const ESTADOS_REPORTE = ['Pendiente', 'Revisado', 'Descartado', 'Aceptado'];

module.exports = {
    Reporte: {
        type: 'object',
        properties: {
            id: { type: 'integer', example: 1 },
            usuario_reportado_id: { type: 'integer', nullable: true, example: 8 },
            usuario_reportante_id: { type: 'integer', example: 3 },
            articulos_id: { type: 'integer', nullable: true, example: 12 },
            moderador_id: { type: 'integer', example: 1 },
            motivo: { type: 'string', example: 'Contenido inapropiado' },
            descripcion: { type: 'string', example: 'El artículo no coincide con la descripción publicada.' },
            estado: { type: 'string', enum: ESTADOS_REPORTE, example: 'Pendiente' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
        },
    },
    ReporteRequest: {
        type: 'object',
        required: ['usuario_reportante_id', 'moderador_id', 'motivo', 'descripcion', 'estado'],
        properties: {
            usuario_reportado_id: { type: 'integer', nullable: true, example: 8 },
            usuario_reportante_id: { type: 'integer', example: 3 },
            articulos_id: { type: 'integer', nullable: true, example: 12 },
            moderador_id: { type: 'integer', example: 1 },
            motivo: { type: 'string', example: 'Contenido inapropiado' },
            descripcion: { type: 'string', example: 'El artículo no coincide con la descripción publicada.' },
            estado: { type: 'string', enum: ESTADOS_REPORTE, example: 'Pendiente' },
        },
    },
};
