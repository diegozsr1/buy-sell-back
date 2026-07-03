const router = require('express').Router();
const articulosController = require('../../controllers/articulos.controller');

// Rutas de tus compañeros totalmente operativas
router.get('/explorar', articulosController.getArticulosExplorar);
router.get('/recientes', articulosController.getArticulosRecientes);
router.get('/mas-vendidos', articulosController.getArticulosMasVendidos);
router.get('/usuario/:user_id', articulosController.getArticulosPorUsuario);
router.get('/:id', articulosController.getArticuloById);
router.get('/', articulosController.getArticulos);
router.post('/con-fotos', articulosController.createArticuloConFotos);
router.post('/', articulosController.createArticulo);

// Desactivamos la ruta rota temporalmente para que arranque el servidor
// router.put('/:id', articulosController.updateArticulo);

module.exports = router;
