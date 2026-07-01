const router = require('express').Router();
const uploadFotoMiddleware = require('../../middleware/uploadIcono.middleware.js');
const {
    getArticulos,
    getArticulosExplorar,
    getArticuloById,
    getArticulosRecientes,
    getArticulosMasVendidos,
    getArticulosPublicadosByUsuario,
    createArticulo,
    createArticuloConFotos,
    updateArticulo,
    deleteArticulo,
    updateArticuloAndCP,
    getArticulosPorUsuario
} = require('../../controllers/articulos.controller');
const { checkToken } = require('../../middleware/auth.middleware');
const { MAX_FOTOS_ARTICULO } = require('../../schemas/articulos.schema.js');

const handleFotosUpload = (req, res, next) => {
    uploadFotoMiddleware.array('photos', MAX_FOTOS_ARTICULO)(req, res, (error) => {
        if (error) {
            return res.status(400).json({ mensaje: error.message });
        }
        next();
    });
};

/**
 * @swagger
 * tags:
 *   name: Artículos
 *   description: Gestión de artículos en venta
 */

/**
 * @swagger
 * /api/articulos:
 *   get:
 *     summary: Listar artículos
 *     description: Devuelve todos los artículos registrados.
 *     tags: [Artículos]
 *     responses:
 *       200:
 *         description: Lista de artículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Articulo'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeErrorResponse'
 */
router.get('/', getArticulos);

/* TODO: swagger */
/* Muestra los artículos que ha publicado un usuario concreto (en cualquier estado) */
router.get('/get-all/usuario/:user_id',getArticulosPorUsuario);

/**
 * @swagger
 * /api/articulos/recientes:
 *   get:
 *     summary: Artículos subidos recientemente
 *     description: Devuelve los artículos creados en los últimos 7 días, ordenados del más reciente al más antiguo.
 *     tags: [Artículos]
 *     responses:
 *       200:
 *         description: Lista de artículos recientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Articulo'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeErrorResponse'
 */
router.get('/recientes', getArticulosRecientes);

/**
 * @swagger
 * /api/articulos/explorar:
 *   get:
 *     summary: Explorar artículos con detalle y paginación
 *     description: Devuelve artículos publicados o vendidos con datos del vendedor, categoría, foto y valoraciones. Soporta filtros y ordenación para la pantalla de exploración.
 *     tags: [Artículos]
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: por_pagina
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 12
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Texto de búsqueda en título y descripción
 *       - in: query
 *         name: categorias_id
 *         schema:
 *           type: string
 *         description: IDs de categoría separados por coma (ej. 1,2,3)
 *       - in: query
 *         name: precio_min
 *         schema:
 *           type: number
 *       - in: query
 *         name: precio_max
 *         schema:
 *           type: number
 *       - in: query
 *         name: estado_conservacion
 *         schema:
 *           type: string
 *         description: Estados separados por coma (Nuevo, Como nuevo, Buen estado...)
 *       - in: query
 *         name: ubicacion
 *         schema:
 *           type: string
 *         description: Filtra por CP o zona geográfica del vendedor
 *       - in: query
 *         name: ordenar
 *         schema:
 *           type: string
 *           enum: [relevancia, precio-asc, precio-desc, recientes]
 *           default: relevancia
 *     responses:
 *       200:
 *         description: Listado paginado de artículos con detalle
 *       400:
 *         description: Parámetros de consulta no válidos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/explorar', getArticulosExplorar);

/**
 * @swagger
 * /api/articulos/mas-vendidos:
 *   get:
 *     summary: Artículos más vendidos
 *     description: Devuelve los 10 artículos con más pedidos completados y la moda de CP ponderada por ventas (provincia derivada del código postal).
 *     tags: [Artículos]
 *     responses:
 *       200:
 *         description: Ranking de artículos más vendidos con resumen geográfico
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticulosMasVendidosResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeErrorResponse'
 */
router.get('/mas-vendidos', getArticulosMasVendidos);

/**
 * @swagger
 * /api/articulos/usuario/{usuarioId}/publicados:
 *   get:
 *     summary: Artículos publicados por un usuario
 *     description: Devuelve el número de artículos con estado Publicado que ha publicado el usuario indicado.
 *     tags: [Artículos]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario vendedor
 *         example: 2
 *     responses:
 *       200:
 *         description: Total de artículos publicados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticulosPublicadosResponse'
 *             example:
 *               usuario_id: 2
 *               total_publicados: 5
 *       400:
 *         description: ID de usuario no válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeErrorResponse'
 */
router.get('/usuario/:usuarioId/publicados', getArticulosPublicadosByUsuario);

/**
 * @swagger
 * /api/articulos/{id}:
 *   get:
 *     summary: Obtener un artículo por ID
 *     tags: [Artículos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       200:
 *         description: Artículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Articulo'
 *       404:
 *         description: Artículo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *             example:
 *               mensaje: Artículo no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeErrorResponse'
 */
router.get('/:id', getArticuloById);

/**
 * @swagger
 * /api/articulos:
 *   post:
 *     summary: Crear un artículo
 *     tags: [Artículos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticuloRequest'
 *     responses:
 *       201:
 *         description: Artículo creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeCreateResponse'
 *             example:
 *               mensaje: Artículo creado correctamente
 *               id: 1
 *       400:
 *         description: Faltan campos obligatorios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeErrorResponse'
 */
router.post('/', checkToken, createArticulo);

/**
 * @swagger
 * /api/articulos/con-fotos:
 *   post:
 *     summary: Crear un artículo con fotos
 *     description: Crea un artículo y sube entre 1 y 5 imágenes a Cloudinary en una sola petición.
 *     tags: [Artículos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ArticuloConFotosRequest'
 *     responses:
 *       201:
 *         description: Artículo creado con fotos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticuloConFotosCreateResponse'
 *       400:
 *         description: Datos o imágenes no válidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeErrorResponse'
 */
router.post('/con-fotos', checkToken, handleFotosUpload, createArticuloConFotos);

/**
 * @swagger
 * /api/articulos/{id}:
 *   put:
 *     summary: Actualizar un artículo
 *     tags: [Artículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticuloRequest'
 *     responses:
 *       200:
 *         description: Artículo actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *             example:
 *               mensaje: Artículo actualizado correctamente
 *       404:
 *         description: Artículo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeErrorResponse'
 */
router.put('/:id', checkToken, updateArticulo);

/* todo: swagger */
/* Actualiza un artículo y también el código postal del usuario que lo ha publicado */
router.put('/:id/cp', checkToken, updateArticuloAndCP);

/**
 * @swagger
 * /api/articulos/{id}:
 *   delete:
 *     summary: Retirar un artículo
 *     description: Baja lógica del artículo. Actualiza estado_articulo_id a Retirado sin borrar el registro.
 *     tags: [Artículos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         example: 1
 *     responses:
 *       200:
 *         description: Artículo retirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *             example:
 *               mensaje: Artículo retirado correctamente
 *       404:
 *         description: Artículo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeErrorResponse'
 */
router.delete('/:id', checkToken, deleteArticulo);

module.exports = router;
