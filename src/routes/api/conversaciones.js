const router = require('express').Router();
const {
    getConversaciones,
    getConversacionById,
    createConversacion,
    updateConversacion,
    deleteConversacion,
} = require('../../controllers/conversaciones.controller');

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
router.get('/', getConversaciones);

/**
 * @swagger
 * /api/conversaciones/{id}:
 *   get:
 *     summary: Obtener una conversación por ID
 *     tags: [Conversaciones]
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
router.get('/:id', getConversacionById);

/**
 * @swagger
 * /api/conversaciones:
 *   post:
 *     summary: Crear una conversación
 *     tags: [Conversaciones]
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
router.post('/', createConversacion);

/**
 * @swagger
 * /api/conversaciones/{id}:
 *   put:
 *     summary: Actualizar una conversación
 *     tags: [Conversaciones]
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
router.put('/:id', updateConversacion);

/**
 * @swagger
 * /api/conversaciones/{id}:
 *   delete:
 *     summary: Eliminar una conversación
 *     tags: [Conversaciones]
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
router.delete('/:id', deleteConversacion);

module.exports = router;
