const router = require('express').Router();
const {
    getArticulos,
    getArticuloById,
    createArticulo,
    updateArticulo,
    deleteArticulo,
} = require('../../controllers/articulos.controller');

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
router.post('/', createArticulo);

/**
 * @swagger
 * /api/articulos/{id}:
 *   put:
 *     summary: Actualizar un artículo
 *     tags: [Artículos]
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
router.put('/:id', updateArticulo);

/**
 * @swagger
 * /api/articulos/{id}:
 *   delete:
 *     summary: Eliminar un artículo
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
 *         description: Artículo eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *             example:
 *               mensaje: Artículo eliminado correctamente
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
router.delete('/:id', deleteArticulo);

module.exports = router;
