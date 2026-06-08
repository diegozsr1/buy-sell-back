const yup = require('yup');

const loginSchema = yup.object({
    username: yup
        .string()
        .trim()
        .max(45, 'El username no puede superar 45 caracteres')
        .required('El username es obligatorio'),
    password: yup
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(255, 'La contraseña no puede superar 255 caracteres')
        .required('La contraseña es obligatoria')
}).noUnknown(true, 'Campo no permitido');

module.exports = {
    loginSchema
};
