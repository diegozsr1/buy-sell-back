const router = require('express').Router();
const { getDashboard } = require('../../controllers/estadisticas.controller');

/**
 * @swagger
 * tags:
 *   name: Estadísticas
 *   description: Métricas del panel de administración
 */

/**
 * @swagger
 * /api/estadisticas/dashboard:
 *   get:
 *     summary: Estadísticas del dashboard
 *     description: |
 *       Devuelve las métricas del panel de administración para la temporalidad indicada.
 *       Los porcentajes de variación comparan el periodo actual con el periodo anterior del mismo tamaño.
 *     tags: [Estadísticas]
 *     parameters:
 *       - in: query
 *         name: temporalidad
 *         required: true
 *         schema:
 *           type: string
 *           enum: [1d, 1s, 1m, 6m, 1a, 3a]
 *           default: 1m
 *         description: |
 *           Ventana temporal: 1d (1 día), 1s (1 semana), 1m (1 mes), 6m (6 meses), 1a (1 año), 3a (3 años)
 *         example: 1m
 *     responses:
 *       200:
 *         description: Estadísticas del dashboard
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardEstadisticasResponse'
 *       400:
 *         description: Temporalidad no válida
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
router.get('/dashboard', getDashboard);

module.exports = router;
