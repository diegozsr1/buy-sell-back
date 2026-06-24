const router = require('express').Router();

router.use('/articulo_fotos', require('./api/articulo_fotos'));
router.use('/articulos', require('./api/articulos'));
router.use('/categorias', require('./api/categorias'));
router.use('/usuarios', require('./api/usuarios'));
router.use('/login', require('./api/login'));
router.use('/conversaciones', require('./api/conversaciones'));
router.use('/favoritos', require('./api/favoritos'));
router.use('/usuarios-favoritos', require('./api/usuarios_favoritos'));
router.use('/mensajes', require('./api/mensajes'));
router.use('/pedidos', require('./api/pedidos'));
router.use('/reportes', require('./api/reportes'));
router.use('/valoraciones', require('./api/valoraciones'));
router.use('/estadisticas', require('./api/estadisticas'));

module.exports = router;
