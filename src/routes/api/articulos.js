const router = require('express').Router();
const {
    getArticulos,
    getArticuloById,
    getArticulosRecientes,
    getArticulosPublicadosByUsuario,
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
