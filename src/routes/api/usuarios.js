const router = require('express').Router();
const {
    getUsuarios,
    countUsuarios,
    countUsuariosByRol,
    countUsuariosByBloqueado,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../../controllers/usuarios.controller');

router.get('/count', countUsuarios);
router.get('/count/rol/:rol', countUsuariosByRol);
router.get('/count/bloqueado/:bloqueado', countUsuariosByBloqueado);
router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;
