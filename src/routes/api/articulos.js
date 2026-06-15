const router = require('express').Router();
const {
    getArticulos,
    getArticuloById,
    createArticulo,
    updateArticulo,
    deleteArticulo,
} = require('../../controllers/articulos.controller');

router.get('/', getArticulos);
router.get('/:id', getArticuloById);
router.post('/', createArticulo);
router.put('/:id', updateArticulo);
router.delete('/:id', deleteArticulo);

module.exports = router;
