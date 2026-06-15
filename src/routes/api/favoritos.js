const router = require('express').Router();
const {
    getFavoritos,
    getFavoritoById,
    createFavorito,
    updateFavorito,
    deleteFavorito,
} = require('../../controllers/favoritos.controller');

router.get('/', getFavoritos);
router.get('/:id', getFavoritoById);
router.post('/', createFavorito);
router.put('/:id', updateFavorito);
router.delete('/:id', deleteFavorito);

module.exports = router;
