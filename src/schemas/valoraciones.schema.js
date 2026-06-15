const yup = require('yup');

const valoracionUsuarioIdSchema = yup.object({
    usuarioId: yup
        .number()
        .integer('El id debe ser un número entero')
        .positive('El id debe ser positivo')
        .required('El id es obligatorio')
        .transform((value, originalValue) => Number(originalValue)),
});

const valoracionIdSchema = yup.object({
    id: yup
        .number()
        .integer('El id debe ser un número entero')
        .positive('El id debe ser positivo')
        .required('El id es obligatorio')
        .transform((value, originalValue) => Number(originalValue)),
});

const valoracionSchema = yup.object({
    usuario_valorador_id: yup
        .number()
        .integer('El id del valorador debe ser un número entero')
        .positive('El id del valorador debe ser positivo')
        .required('El usuario valorador es obligatorio'),
    articulos_id: yup
        .number()
        .integer('El id del artículo debe ser un número entero')
        .positive('El id del artículo debe ser positivo')
        .required('El artículo es obligatorio'),
    puntuacion: yup
        .number()
        .min(0, 'La puntuación mínima es 0')
        .max(5, 'La puntuación máxima es 5')
        .required('La puntuación es obligatoria')
        .transform((value, originalValue) => Number(originalValue)),
    mensaje: yup
        .string()
        .trim()
        .required('El mensaje es obligatorio'),
}).noUnknown(true, 'Campo no permitido');

module.exports = {
    valoracionUsuarioIdSchema,
    valoracionIdSchema,
    valoracionSchema,
};
