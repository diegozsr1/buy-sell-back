const router = require('express').Router();
const {
    getValoraciones,
    getValoracionById,
    createValoracion,
    updateValoracion,
    deleteValoracion,
} = require('../../controllers/valoraciones.controller');

router.get('/', getValoraciones);
router.get('/:id', getValoracionById);
router.post('/', createValoracion);
router.put('/:id', updateValoracion);
router.delete('/:id', deleteValoracion);

module.exports = router;
