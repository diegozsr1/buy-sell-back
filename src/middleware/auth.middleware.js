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

const extractBearerToken = (authorizationHeader) => {
    if (!authorizationHeader) return null;
    const [scheme, token] = authorizationHeader.split(' ');
    if (scheme !== 'Bearer' || !token) return null;
    return token;
};

const resolveUsuarioFromToken = async (token) => {
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UsuarioModel.getById(decoded.id);
        return user || null;
    } catch {
        return null;
    }
};

const resolveUsuario = async ({ token, allowBypass = true }) => {
    const userFromToken = await resolveUsuarioFromToken(token);
    if (userFromToken) return userFromToken;

    if (allowBypass && isAuthBypassEnabled()) {
        return getBypassUsuario();
    }

    return null;
};

const checkToken = async (req, res, next) => {
    const token = extractBearerToken(req.headers.authorization);
    const user = await resolveUsuario({ token, allowBypass: true });

    if (!user) {
        if (!token) {
            return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
        }
        return res.status(401).json({ error: 'Token de autenticación inválido' });
    }

    req.usuario = user;
    next();
};

const checkAdmin = (req, res, next) => {
    if (isAuthBypassEnabled() && req.usuario?.id === 0) return next();

    if (req.usuario.roles_id !== 'Administrador') {
        return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de Administrador' });
    }
    next();
};

const checkModerator = (req, res, next) => {
    if (isAuthBypassEnabled() && req.usuario?.id === 0) return next();

    if (req.usuario.roles_id !== 'Moderador' && req.usuario.roles_id !== 'Administrador') {
        return res.status(403).json({
            error: 'Acceso denegado. Se requiere rol de Moderador o Administrador',
        });
    }
    next();
};

module.exports = {
    checkToken,
    checkAdmin,
    checkModerator,
    isAuthBypassEnabled,
    getBypassUsuario,
    resolveUsuario,
    resolveUsuarioFromToken,
    extractBearerToken,
};
