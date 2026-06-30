const yup = require('yup');

const conversacionIdSchema = yup.object({
    id: yup
        .number()
        .integer('El id debe ser un número entero')
        .positive('El id debe ser positivo')
        .required('El id es obligatorio')
        .transform((value, originalValue) => Number(originalValue)),
});

const pedidoIdParamSchema = yup.object({
    pedidoId: yup
        .number()
        .integer('El id del pedido debe ser un número entero')
        .positive('El id del pedido debe ser positivo')
        .required('El id del pedido es obligatorio')
        .transform((value, originalValue) => Number(originalValue)),
});

const mensajeCreateSchema = yup.object({
    mensaje: yup
        .string()
        .trim()
        .min(1, 'El mensaje no puede estar vacío')
        .max(2000, 'El mensaje no puede superar 2000 caracteres')
        .required('El mensaje es obligatorio'),
}).noUnknown(true, 'Campo no permitido');

module.exports = {
    conversacionIdSchema,
    pedidoIdParamSchema,
    mensajeCreateSchema,
};
