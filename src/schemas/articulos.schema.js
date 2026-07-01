const yup = require('yup');

const ESTADOS_CONSERVACION = ['Nuevo', 'Como nuevo', 'Buen estado', 'Usado', 'Dañado'];
const ESTADOS_ARTICULO = ['Borrador', 'Publicado', 'En_revision', 'Retirado', 'Reservado', 'Vendido'];
const MAX_FOTOS_ARTICULO = 5;

const toNumber = (value, originalValue) => {
    if (originalValue === '' || originalValue === undefined || originalValue === null) {
        return undefined;
    }
    return Number(originalValue);
};

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

const articuloConFotosSchema = yup.object({
    usuarios_id: yup
        .number()
        .integer('usuarios_id debe ser un número entero')
        .positive('usuarios_id debe ser positivo')
        .required('usuarios_id es obligatorio')
        .transform(toNumber),
    titulo: yup
        .string()
        .trim()
        .max(255, 'El título no puede superar 255 caracteres')
        .required('El título es obligatorio'),
    descripcion: yup
        .string()
        .trim()
        .required('La descripción es obligatoria'),
    categorias_id: yup
        .number()
        .integer('categorias_id debe ser un número entero')
        .positive('categorias_id debe ser positivo')
        .required('categorias_id es obligatorio')
        .transform(toNumber),
    precio: yup
        .number()
        .min(0, 'El precio no puede ser negativo')
        .required('El precio es obligatorio')
        .transform(toNumber),
    estado_conservacion_id: yup
        .string()
        .oneOf(
            ESTADOS_CONSERVACION,
            `estado_conservacion_id debe ser uno de: ${ESTADOS_CONSERVACION.join(', ')}`
        )
        .required('estado_conservacion_id es obligatorio'),
    estado_articulo_id: yup
        .string()
        .oneOf(
            ESTADOS_ARTICULO,
            `estado_articulo_id debe ser uno de: ${ESTADOS_ARTICULO.join(', ')}`
        )
        .required('estado_articulo_id es obligatorio'),
    principal_index: yup
        .number()
        .integer('principal_index debe ser un número entero')
        .min(0, 'principal_index no puede ser negativo')
        .required('principal_index es obligatorio')
        .transform(toNumber),
}).test('fotos', 'Validación de imágenes', function (value) {
    const filesCount = this.options.context?.filesCount ?? 0;

    if (filesCount === 0) {
        return this.createError({
            path: 'photos',
            message: 'Debe enviar al menos una imagen',
        });
    }

    if (filesCount > MAX_FOTOS_ARTICULO) {
        return this.createError({
            path: 'photos',
            message: `Máximo ${MAX_FOTOS_ARTICULO} imágenes por artículo`,
        });
    }

    if (value.principal_index >= filesCount) {
        return this.createError({
            path: 'principal_index',
            message: 'principal_index no válido',
        });
    }

    return true;
});

module.exports = {
    articuloUsuarioIdSchema,
    articulosExplorarQuerySchema,
    articuloConFotosSchema,
    MAX_FOTOS_ARTICULO,
};
