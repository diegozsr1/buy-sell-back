const router = require('express').Router();

router.use('/articulos', require('./api/articulos'));

module.exports = router;