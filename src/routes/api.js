const router = require('express').Router();

router.use('/categorias', require('./api/categorias'));

module.exports = router;