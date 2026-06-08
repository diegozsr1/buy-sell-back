const bcrypt = require('bcrypt');
const LoginModel = require('../models/login.model.js');
const { loginSchema } = require('../schemas/login.schema.js');
const { signToken } = require('../config/jwt.js');

const validationOptions = { abortEarly: false, stripUnknown: true };

const handleValidationError = (error, res) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            detalles: error.errors
        });
    }
    return null;
};

const omitPassword = (usuario) => {
    if (!usuario) return usuario;
    const { password, ...rest } = usuario;
    return rest;
};

const login = async (req, res) => {
    try {
        const { username, password } = await loginSchema.validate(req.body, validationOptions);
        const usuario = await LoginModel.getByUsername(username);

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        if (usuario.bloqueado === 1) {
            return res.status(403).json({ error: 'Usuario bloqueado' });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const usuarioSinPassword = omitPassword(usuario);
        const token = signToken({
            id: usuario.id,
            username: usuario.username,
            roles_id: usuario.roles_id
        });

        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            usuario: usuarioSinPassword
        });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al iniciar sesión' });
    }
};

module.exports = {
    login
};
