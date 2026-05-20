const router = require('express').Router();

router.use('/categorias', require('./api/categories'));

module.exports = router;