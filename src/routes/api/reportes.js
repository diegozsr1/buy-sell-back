const router = require('express').Router();
const {
    getReportes,
    getReporteById,
    createReporte,
    updateReporte,
    deleteReporte,
} = require('../../controllers/reportes.controller');

router.get('/', getReportes);
router.get('/:id', getReporteById);
router.post('/', createReporte);
router.put('/:id', updateReporte);
router.delete('/:id', deleteReporte);

module.exports = router;
