const router = require('express').Router();
const controller = require('../../controllers/notificaciones.controller');
const { checkToken } = require('../../middleware/auth.middleware');

router.get('/usuario/:usuarioId', checkToken, controller.obtenerNotificaciones);
router.get('/usuario/:usuarioId/sin-leer', checkToken, controller.contarSinLeer);
router.put('/usuario/:usuarioId/leer', checkToken, controller.marcarComoLeidas);

module.exports = router;
