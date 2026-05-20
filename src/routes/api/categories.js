

const router = require('express').Router();
const { getCategories } = require('../../controllers/categories.controller');

router.get('/listar', getCategories);

module.exports = router;