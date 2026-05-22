

const router = require('express').Router();
const { getCategorias } = require('../../controllers/categorias.controller');

router.get('/', getCategorias);

module.exports = router;