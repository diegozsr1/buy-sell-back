const router = require("express").Router();
const {
  obtenerNotificaciones,
  contarSinLeer,
  marcarComoLeidas,
} = require("../../controllers/notificaciones.controller");
const { checkToken } = require("../../middleware/auth.middleware");

router.get("/usuario/:usuarioId", checkToken, obtenerNotificaciones);
router.get("/usuario/:usuarioId/sin-leer", checkToken, contarSinLeer);
router.put("/usuario/:usuarioId/leer", checkToken, marcarComoLeidas);

module.exports = router;
