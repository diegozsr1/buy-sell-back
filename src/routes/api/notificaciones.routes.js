const router = require('express').Router();
const controller = require('../../controllers/notificaciones.controller');

router.get('/usuario/:usuarioId', controller.obtenerNotificaciones);
router.get('/usuario/:usuarioId/sin-leer', controller.contarSinLeer);
router.put('/usuario/:usuarioId/leer', controller.marcarComoLeidas);

module.exports = router;
