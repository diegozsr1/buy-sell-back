const router = require('express').Router();
const {
    getArticuloFotos,
    getArticuloFotoById,
    createArticuloFoto,
    updateArticuloFoto,
    deleteArticuloFoto,
} = require('../../controllers/articulo_fotos.controller');

router.get('/', getArticuloFotos);
router.get('/:id', getArticuloFotoById);
router.post('/', createArticuloFoto);
router.put('/:id', updateArticuloFoto);
router.delete('/:id', deleteArticuloFoto);

module.exports = router;
