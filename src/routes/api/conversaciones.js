const router = require('express').Router();
const {
    getConversaciones,
    getConversacionById,
    createConversacion,
    updateConversacion,
    deleteConversacion,
} = require('../../controllers/conversaciones.controller');
const { checkToken } = require('../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Conversaciones
 *   description: Gestión de conversaciones entre compradores y vendedores
 */

/**
 * @swagger
 * /api/conversaciones:
 *   get:
 *     summary: Listar conversaciones
 *     tags: [Conversaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de conversaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Conversacion'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeErrorResponse'
 */
router.get('/', checkToken, getConversaciones);

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
 *           minimum: 1
 *         example: 1
 *     responses:
 *       200:
 *         description: Conversación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conversacion'
 *       404:
 *         description: Conversación no encontrada
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
router.get('/:id', checkToken, getConversacionById);

/**
 * @swagger
 * /api/conversaciones:
 *   post:
 *     summary: Crear una conversación
 *     tags: [Conversaciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConversacionRequest'
 *     responses:
 *       201:
 *         description: Conversación creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeCreateResponse'
 *             example:
 *               mensaje: Conversación creada correctamente
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
router.post('/', checkToken, createConversacion);

/**
 * @swagger
 * /api/conversaciones/{id}:
 *   put:
 *     summary: Actualizar una conversación
 *     tags: [Conversaciones]
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
 *             $ref: '#/components/schemas/ConversacionRequest'
 *     responses:
 *       200:
 *         description: Conversación actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       404:
 *         description: Conversación no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
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
router.put('/:id', checkToken, updateConversacion);

/**
 * @swagger
 * /api/conversaciones/{id}:
 *   delete:
 *     summary: Eliminar una conversación
 *     tags: [Conversaciones]
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
 *         description: Conversación eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       404:
 *         description: Conversación no encontrada
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
router.delete('/:id', checkToken, deleteConversacion);

module.exports = router;
