const router = require('express').Router();

router.use('/categorias', require('./api/categorias'));
router.use('/articulos', require('./api/articulos'));

module.exports = router;