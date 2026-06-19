const yup = require('yup');

const ROLES = ['Usuario', 'Moderador', 'Administrador'];

const usuarioSchema = yup.object({
    nombre: yup
        .string()
        .trim()
        .max(45, 'El nombre no puede superar 45 caracteres')
        .required('El nombre es obligatorio'),
    apellidos: yup
        .string()
        .trim()
        .max(100, 'Los apellidos no pueden superar 100 caracteres')
        .required('Los apellidos son obligatorios'),
    username: yup
        .string()
        .trim()
        .max(45, 'El username no puede superar 45 caracteres')
        .required('El username es obligatorio'),
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
        .required('La contraseña es obligatoria'),
    foto: yup
        .string()
        .trim()
        .max(255, 'La foto no puede superar 255 caracteres')
        .optional(),
    roles_id: yup
        .string()
        .oneOf(ROLES, `El rol debe ser uno de: ${ROLES.join(', ')}`)
        .default('Usuario'),
    direccion: yup
        .string()
        .trim()
        .max(255, 'La dirección no puede superar 255 caracteres')
        .optional(),
    zona_geografica: yup
        .string()
        .trim()
        .max(100, 'La zona geográfica no puede superar 100 caracteres')
        .optional(),
    cp: yup
        .string()
        .trim()
        .matches(/^\d{5}$/, 'El código postal debe tener 5 dígitos')
        .nullable()
        .optional()
        .transform((value, originalValue) =>
            originalValue === '' || originalValue === null || originalValue === undefined
                ? null
                : String(originalValue).trim()
        ),
    bloqueado: yup
        .number()
        .integer()
        .oneOf([0, 1], 'El campo bloqueado debe ser 0 o 1')
        .default(0)
        .optional()
}).noUnknown(true, 'Campo no permitido');

const usuarioIdSchema = yup.object({
    id: yup
        .number()
        .integer('El id debe ser un número entero')
        .positive('El id debe ser positivo')
        .required('El id es obligatorio')
        .transform((value, originalValue) => Number(originalValue))
});

const usuarioRolSchema = yup.object({
    rol: yup
        .string()
        .oneOf(ROLES, `El rol debe ser uno de: ${ROLES.join(', ')}`)
        .required('El rol es obligatorio')
});

const usuarioBloqueadoSchema = yup.object({
    bloqueado: yup
        .number()
        .integer()
        .oneOf([0, 1], 'El campo bloqueado debe ser 0 o 1')
        .required('El campo bloqueado es obligatorio')
        .transform((value, originalValue) => Number(originalValue))
});

module.exports = {
    usuarioSchema,
    usuarioIdSchema,
    usuarioRolSchema,
    usuarioBloqueadoSchema
};
