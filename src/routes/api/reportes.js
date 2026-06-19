const router = require('express').Router();
const {
    getReportes,
    getReporteById,
    createReporte,
    updateReporte,
    deleteReporte,
} = require('../../controllers/reportes.controller');
const { checkToken, checkModerator } = require('../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Reportes
 *   description: Gestión de reportes y moderación
 */

/**
 * @swagger
 * /api/reportes:
 *   get:
 *     summary: Listar reportes
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reportes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reporte'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', checkToken, checkModerator, getReportes);

/**
 * @swagger
 * /api/reportes/{id}:
 *   get:
 *     summary: Obtener un reporte por ID
 *     tags: [Reportes]
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
 *         description: Reporte encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reporte'
 *       404:
 *         description: Reporte no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', checkToken, checkModerator, getReporteById);

/**
 * @swagger
 * /api/reportes:
 *   post:
 *     summary: Crear un reporte
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReporteRequest'
 *     responses:
 *       201:
 *         description: Reporte creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeCreateResponse'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', checkToken, checkModerator, createReporte);

/**
 * @swagger
 * /api/reportes/{id}:
 *   put:
 *     summary: Actualizar un reporte
 *     tags: [Reportes]
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
 *             $ref: '#/components/schemas/ReporteRequest'
 *     responses:
 *       200:
 *         description: Reporte actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       404:
 *         description: Reporte no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', checkToken, checkModerator, updateReporte);

/**
 * @swagger
 * /api/reportes/{id}:
 *   delete:
 *     summary: Eliminar un reporte
 *     tags: [Reportes]
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
 *         description: Reporte eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       404:
 *         description: Reporte no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', checkToken, checkModerator, deleteReporte);

module.exports = router;
