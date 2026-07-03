const yup = require('yup');

const TIPOS_NOTIFICACION = ['sale', 'review', 'moderation'];

const notificacionUsuarioIdSchema = yup.object({
    usuarioId: yup
        .number()
        .integer('El id debe ser un número entero')
        .positive('El id debe ser positivo')
        .required('El id es obligatorio')
        .transform((value, originalValue) => Number(originalValue)),
});

const notificacionIdParamsSchema = yup.object({
    usuarioId: yup
        .number()
        .integer('El id debe ser un número entero')
        .positive('El id debe ser positivo')
        .required('El id es obligatorio')
        .transform((value, originalValue) => Number(originalValue)),
    notificacionId: yup
        .number()
        .integer('El id de la notificación debe ser un número entero')
        .positive('El id de la notificación debe ser positivo')
        .required('El id de la notificación es obligatorio')
        .transform((value, originalValue) => Number(originalValue)),
});

const notificacionCreateSchema = yup.object({
    usuarios_id: yup
        .number()
        .integer('El id del usuario debe ser un número entero')
        .positive('El id del usuario debe ser positivo')
        .required('El usuario es obligatorio'),
    articulos_id: yup
        .number()
        .integer('El id del artículo debe ser un número entero')
        .positive('El id del artículo debe ser positivo')
        .required('El artículo es obligatorio'),
    tipo: yup
        .string()
        .oneOf(TIPOS_NOTIFICACION, `El tipo debe ser uno de: ${TIPOS_NOTIFICACION.join(', ')}`)
        .required('El tipo es obligatorio'),
    titulo: yup
        .string()
        .trim()
        .max(150, 'El título no puede superar 150 caracteres')
        .required('El título es obligatorio'),
    mensaje: yup
        .string()
        .trim()
        .max(500, 'El mensaje no puede superar 500 caracteres')
        .required('El mensaje es obligatorio'),
}).noUnknown(true, 'Campo no permitido');

module.exports = {
    TIPOS_NOTIFICACION,
    notificacionUsuarioIdSchema,
    notificacionIdParamsSchema,
    notificacionCreateSchema,
};
