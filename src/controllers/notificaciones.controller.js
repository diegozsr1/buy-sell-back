const NotificacionModel = require('../models/notificaciones.model.js');
const { isAuthBypassEnabled } = require('../middleware/auth.middleware.js');
const { notificacionUsuarioIdSchema } = require('../schemas/notificaciones.schema.js');

const validationOptions = { abortEarly: false, stripUnknown: true };

const handleValidationError = (error, res) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            detalles: error.errors,
        });
    }
    return null;
};

const assertUsuarioAutorizado = (req, usuarioId) => {
    if (isAuthBypassEnabled() && req.usuario?.id === 0) {
        return;
    }

    if (Number(req.usuario.id) !== Number(usuarioId)) {
        const error = new Error('No tienes permiso para acceder a estas notificaciones');
        error.statusCode = 403;
        throw error;
    }
};

const obtenerNotificaciones = async (req, res) => {
    try {
        const { usuarioId } = await notificacionUsuarioIdSchema.validate(req.params, validationOptions);
        assertUsuarioAutorizado(req, usuarioId);

        const notificaciones = await NotificacionModel.getByUsuarioId(usuarioId);
        res.json(notificaciones);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;

        if (error.statusCode === 403) {
            return res.status(403).json({ error: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};

const contarSinLeer = async (req, res) => {
    try {
        const { usuarioId } = await notificacionUsuarioIdSchema.validate(req.params, validationOptions);
        assertUsuarioAutorizado(req, usuarioId);

        const totalSinLeer = await NotificacionModel.countSinLeerByUsuarioId(usuarioId);
        res.json({ sinLeer: totalSinLeer });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;

        if (error.statusCode === 403) {
            return res.status(403).json({ error: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};

const marcarComoLeidas = async (req, res) => {
    try {
        const { usuarioId } = await notificacionUsuarioIdSchema.validate(req.params, validationOptions);
        assertUsuarioAutorizado(req, usuarioId);

        await NotificacionModel.marcarComoLeidasByUsuarioId(usuarioId);
        res.json({ message: 'Notificaciones marcadas como leídas' });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;

        if (error.statusCode === 403) {
            return res.status(403).json({ error: error.message });
        }

        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    obtenerNotificaciones,
    contarSinLeer,
    marcarComoLeidas,
};
