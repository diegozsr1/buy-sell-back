const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarios.model.js');

// Solo desarrollo: permite probar Swagger sin JWT (AUTH_BYPASS=true en .env)
const isAuthBypassEnabled = () =>
    process.env.AUTH_BYPASS === 'true' && process.env.NODE_ENV !== 'production';

const getBypassUsuario = () => ({
    id: 0,
    nombre: 'Dev',
    apellidos: 'Bypass',
    username: 'dev_bypass',
    email: 'dev@localhost',
    roles_id: 'Administrador',
    bloqueado: 0,
});

const checkToken = async (req, res, next) => {
    if (isAuthBypassEnabled()) {
        req.usuario = getBypassUsuario();
        return next();
    }

    // Cabecera de autorización
    const authHeader = req.headers.authorization;

    // Existe Token
    if (!authHeader) {
        return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
    }

    // Validación token
    const token = authHeader.split(' ')[1]; // Bearer <token>
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ error: 'Token de autenticación inválido' });
    }

    // Existe el usuario referido
    const user = await UsuarioModel.getById(decoded.id)
    if(!user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    req.usuario = user;

    next();
}

const checkAdmin = (req, res, next) => {
    if (isAuthBypassEnabled()) return next();

    // chequea rol de administrador. lo recibe de checktoken mediante req.usuario.rol
    if (req.usuario.roles_id !== 'Administrador') return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de Administrador' });
    next();
}

const checkModerator = (req, res, next) => {
    if (isAuthBypassEnabled()) return next();

    // chequea rol de moderador. lo recibe de checktoken mediante req.usuario.rol
    if (req.usuario.roles_id !== 'Moderador') return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de Moderador' });
    next();
}

module.exports = {
    checkToken,
    checkAdmin,
    checkModerator,
    isAuthBypassEnabled,
};
