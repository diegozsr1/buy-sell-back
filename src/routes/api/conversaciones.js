const router = require('express').Router();
const {
    getMisConversaciones,
    getNoLeidosCount,
    getConversacionByPedidoId,
    getConversacionById,
    getMensajesByConversacion,
    createMensajeInConversacion,
} = require('../../controllers/conversaciones.controller');
const { checkToken } = require('../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Conversaciones
 *   description: Mensajería entre comprador y vendedor por pedido
 */

/**
 * @swagger
 * /api/conversaciones/mias:
 *   get:
 *     summary: Listar mis conversaciones
 *     tags: [Conversaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conversaciones del usuario autenticado
 */
router.get('/mias', checkToken, getMisConversaciones);

/**
 * @swagger
 * /api/conversaciones/no-leidos/count:
 *   get:
 *     summary: Contar mensajes no leídos
 *     tags: [Conversaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total de mensajes no leídos
 */
router.get('/no-leidos/count', checkToken, getNoLeidosCount);

/**
 * @swagger
 * /api/conversaciones/pedido/{pedidoId}:
 *   get:
 *     summary: Obtener conversación por pedido
 *     tags: [Conversaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Conversación encontrada
 *       404:
 *         description: Conversación no encontrada
 */
router.get('/pedido/:pedidoId', checkToken, getConversacionByPedidoId);

/**
 * @swagger
 * /api/conversaciones/{id}/mensajes:
 *   get:
 *     summary: Listar mensajes de una conversación
 *     tags: [Conversaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de mensajes
 */
router.get('/:id/mensajes', checkToken, getMensajesByConversacion);

/**
 * @swagger
 * /api/conversaciones/{id}/mensajes:
 *   post:
 *     summary: Enviar mensaje en una conversación
 *     tags: [Conversaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [mensaje]
 *             properties:
 *               mensaje:
 *                 type: string
 *                 example: ¿Cuándo lo envías?
 *     responses:
 *       201:
 *         description: Mensaje enviado
 *       403:
 *         description: Pedido completado/cancelado o sin acceso
 */
router.post('/:id/mensajes', checkToken, createMensajeInConversacion);

/**
 * @swagger
 * /api/conversaciones/{id}:
 *   get:
 *     summary: Obtener una conversación por ID
 *     tags: [Conversaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Conversación encontrada
 */
router.get('/:id', checkToken, getConversacionById);

module.exports = router;
