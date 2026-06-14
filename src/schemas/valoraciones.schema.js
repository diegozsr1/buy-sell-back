const yup = require('yup');

const valoracionUsuarioIdSchema = yup.object({
    usuarioId: yup
        .number()
        .integer('El id debe ser un número entero')
        .positive('El id debe ser positivo')
        .required('El id es obligatorio')
        .transform((value, originalValue) => Number(originalValue))
});

module.exports = {
    valoracionUsuarioIdSchema
};
