const yup = require('yup');

const ESTADOS_PEDIDO = ['Pendiente', 'Aceptado', 'Enviado', 'Cancelado', 'Completado'];

const pedidoIdSchema = yup.object({
    id: yup
        .number()
        .integer('El id debe ser un número entero')
        .positive('El id debe ser positivo')
        .required('El id es obligatorio')
        .transform((value, originalValue) => Number(originalValue)),
});

const pedidoSchema = yup.object({
    comprador_id: yup
        .number()
        .integer('El id del comprador debe ser un número entero')
        .positive('El id del comprador debe ser positivo')
        .required('El comprador es obligatorio'),
    articulos_id: yup
        .number()
        .integer('El id del artículo debe ser un número entero')
        .positive('El id del artículo debe ser positivo')
        .required('El artículo es obligatorio'),
    estado: yup
        .string()
        .oneOf(ESTADOS_PEDIDO, `El estado debe ser uno de: ${ESTADOS_PEDIDO.join(', ')}`)
        .required('El estado es obligatorio'),
    direccion_envio: yup
        .string()
        .trim()
        .max(255, 'La dirección no puede superar 255 caracteres')
        .required('La dirección de envío es obligatoria'),
}).noUnknown(true, 'Campo no permitido');

const pedidoUsuarioIdSchema = yup.object({
    usuarioId: yup
        .number()
        .integer('El id debe ser un número entero')
        .positive('El id debe ser positivo')
        .required('El id es obligatorio')
        .transform((value, originalValue) => Number(originalValue)),
});

module.exports = {
    pedidoIdSchema,
    pedidoSchema,
    pedidoUsuarioIdSchema,
};
