const router = require('express').Router();

router.use('/categorias', require('./api/categorias'));
router.use('/usuarios', require('./api/usuarios'));

module.exports = router;