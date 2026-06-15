const router = require('express').Router();
const {
    getArticuloFotos,
    getArticuloFotoById,
    createArticuloFoto,
    updateArticuloFoto,
    deleteArticuloFoto,
} = require('../../controllers/articulo_fotos.controller');

/**
 * @swagger
 * tags:
 *   name: Artículo fotos
 *   description: Gestión de fotos asociadas a artículos
 */

/**
 * @swagger
 * /api/articulo_fotos:
 *   get:
 *     summary: Listar fotos de artículos
 *     description: Devuelve todas las fotos registradas en la base de datos.
 *     tags: [Artículo fotos]
 *     responses:
 *       200:
 *         description: Lista de fotos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArticuloFoto'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', getArticuloFotos);

/**
 * @swagger
 * /api/articulo_fotos/{id}:
 *   get:
 *     summary: Obtener una foto por ID
 *     description: Devuelve los datos de una foto concreta.
 *     tags: [Artículo fotos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de la foto
 *         example: 1
 *     responses:
 *       200:
 *         description: Foto encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticuloFoto'
 *       404:
 *         description: Foto no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticuloFotoMensajeResponse'
 *             example:
 *               mensaje: Foto no encontrada
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getArticuloFotoById);

/**
 * @swagger
 * /api/articulo_fotos:
 *   post:
 *     summary: Crear una foto de artículo
 *     description: Registra una nueva foto asociada a un artículo.
 *     tags: [Artículo fotos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticuloFotoRequest'
 *           example:
 *             url_foto: https://ejemplo.com/fotos/articulo-1.jpg
 *             principal: 1
 *             articulos_id: 12
 *     responses:
 *       201:
 *         description: Foto creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticuloFotoCreateResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createArticuloFoto);

/**
 * @swagger
 * /api/articulo_fotos/{id}:
 *   put:
 *     summary: Actualizar una foto de artículo
 *     description: Modifica los datos de una foto existente.
 *     tags: [Artículo fotos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de la foto
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticuloFotoRequest'
 *           example:
 *             url_foto: https://ejemplo.com/fotos/articulo-1-nueva.jpg
 *             principal: 0
 *             articulos_id: 12
 *     responses:
 *       200:
 *         description: Foto actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticuloFotoMensajeResponse'
 *             example:
 *               mensaje: Foto actualizada correctamente
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', updateArticuloFoto);

/**
 * @swagger
 * /api/articulo_fotos/{id}:
 *   delete:
 *     summary: Eliminar una foto de artículo
 *     description: Elimina una foto por su ID.
 *     tags: [Artículo fotos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de la foto
 *         example: 1
 *     responses:
 *       200:
 *         description: Foto eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArticuloFotoMensajeResponse'
 *             example:
 *               mensaje: Foto eliminada correctamente
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', deleteArticuloFoto);

module.exports = router;
