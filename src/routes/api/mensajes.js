const router = require('express').Router();
const {
    getMensajes,
    getMensajeById,
    createMensaje,
    updateMensaje,
    deleteMensaje,
} = require('../../controllers/mensajes.controller');

router.get('/', getMensajes);
router.get('/:id', getMensajeById);
router.post('/', createMensaje);
router.put('/:id', updateMensaje);
router.delete('/:id', deleteMensaje);

module.exports = router;
