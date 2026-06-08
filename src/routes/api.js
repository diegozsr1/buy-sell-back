const router = require('express').Router();

router.use('/categorias', require('./api/categorias'));
router.use('/mensajes', require('./api/mensajes'));
router.use('/pedidos', require('./api/pedidos'));
router.use('/reportes', require('./api/reportes'));
router.use('/valoraciones', require('./api/valoraciones'));

module.exports = router;
