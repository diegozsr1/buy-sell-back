const yup = require('yup');

const loginSchema = yup.object({
    email: yup
        .string()
        .trim()
        .email('El email no es válido')
        .max(100, 'El email no puede superar 100 caracteres')
        .required('El email es obligatorio'),
    password: yup
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(255, 'La contraseña no puede superar 255 caracteres')
        .required('La contraseña es obligatoria')
}).noUnknown(true, 'Campo no permitido');

module.exports = {
    loginSchema
};
