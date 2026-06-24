const yup = require('yup');

const articuloUsuarioIdSchema = yup.object({
    usuarioId: yup
        .number()
        .integer('El id debe ser un número entero')
        .positive('El id debe ser positivo')
        .required('El id es obligatorio')
        .transform((value, originalValue) => Number(originalValue)),
});

const articulosExplorarQuerySchema = yup.object({
    pagina: yup
        .number()
        .integer('La página debe ser un número entero')
        .min(1, 'La página mínima es 1')
        .default(1)
        .transform((value, originalValue) =>
            originalValue === '' || originalValue === undefined ? 1 : Number(originalValue)
        ),
    por_pagina: yup
        .number()
        .integer('por_pagina debe ser un número entero')
        .min(1, 'por_pagina mínimo es 1')
        .max(50, 'por_pagina máximo es 50')
        .default(12)
        .transform((value, originalValue) =>
            originalValue === '' || originalValue === undefined ? 12 : Number(originalValue)
        ),
    q: yup.string().trim().optional(),
    categorias_id: yup.string().trim().optional(),
    precio_min: yup
        .number()
        .min(0, 'precio_min no puede ser negativo')
        .optional()
        .transform((value, originalValue) =>
            originalValue === '' || originalValue === undefined || originalValue === null
                ? undefined
                : Number(originalValue)
        ),
    precio_max: yup
        .number()
        .min(0, 'precio_max no puede ser negativo')
        .optional()
        .transform((value, originalValue) =>
            originalValue === '' || originalValue === undefined || originalValue === null
                ? undefined
                : Number(originalValue)
        ),
    estado_conservacion: yup.string().trim().optional(),
    ubicacion: yup.string().trim().optional(),
    ordenar: yup
        .string()
        .oneOf(
            ['relevancia', 'precio-asc', 'precio-desc', 'recientes'],
            'ordenar debe ser relevancia, precio-asc, precio-desc o recientes'
        )
        .default('relevancia'),
});

module.exports = {
    articuloUsuarioIdSchema,
    articulosExplorarQuerySchema,
};
