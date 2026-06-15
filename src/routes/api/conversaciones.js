const router = require('express').Router();

const {
    getConversaciones,
    getConversacionById,
    createConversacion,
    updateConversacion,
    deleteConversacion,
} = require('../../controllers/conversaciones.controller');

router.get('/', getConversaciones);
router.get('/:id', getConversacionById);
router.post('/', createConversacion);
router.put('/:id', updateConversacion);
router.delete('/:id', deleteConversacion);

module.exports = router;