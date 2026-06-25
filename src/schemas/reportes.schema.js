const yup = require('yup');

const ESTADOS_REPORTE = ['Pendiente', 'Revisado', 'Descartado', 'Aceptado'];

const nullableId = (label) =>
    yup
        .number()
        .integer(`El id de ${label} debe ser un número entero`)
        .positive(`El id de ${label} debe ser positivo`)
        .nullable()
        .optional()
        .transform((value, originalValue) =>
            originalValue === '' || originalValue === null || originalValue === undefined
                ? null
                : Number(originalValue)
        );

const reporteIdSchema = yup.object({
    id: yup
        .number()
        .integer('El id debe ser un número entero')
        .positive('El id debe ser positivo')
        .required('El id es obligatorio')
        .transform((value, originalValue) => Number(originalValue)),
});

const reporteSchema = yup.object({
    usuario_reportado_id: nullableId('usuario reportado'),
    usuario_reportante_id: yup
        .number()
        .integer('El id del usuario reportante debe ser un número entero')
        .positive('El id del usuario reportante debe ser positivo')
        .required('El usuario reportante es obligatorio'),
    articulos_id: nullableId('artículo'),
    moderador_id: yup
        .number()
        .integer('El id del moderador debe ser un número entero')
        .positive('El id del moderador debe ser positivo')
        .required('El moderador es obligatorio'),
    motivo: yup.string().trim().required('El motivo es obligatorio'),
    descripcion: yup.string().trim().required('La descripción es obligatoria'),
    estado: yup
        .string()
        .oneOf(ESTADOS_REPORTE, `El estado debe ser uno de: ${ESTADOS_REPORTE.join(', ')}`)
        .required('El estado es obligatorio'),
    resultado_reporte: yup
        .string()
        .trim()
        .nullable()
        .optional()
        .transform((value, originalValue) =>
            originalValue === '' || originalValue === null || originalValue === undefined
                ? null
                : value
        ),
}).noUnknown(true, 'Campo no permitido');

module.exports = {
    reporteIdSchema,
    reporteSchema,
};
