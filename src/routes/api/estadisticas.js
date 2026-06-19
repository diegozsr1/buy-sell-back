const router = require('express').Router();
const { getDashboard, getVentasPorMeses } = require('../../controllers/estadisticas.controller');
const { checkToken, checkAdmin } = require('../../middleware/auth.middleware');

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
 *     security:
 *       - bearerAuth: []
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
router.get('/dashboard', checkToken, checkAdmin, getDashboard);

/**
 * @swagger
 * /api/estadisticas/ventas-mensuales:
 *   get:
 *     summary: Ventas por meses (gráfico)
 *     description: |
 *       Devuelve las ventas agrupadas por mes en formato compatible con Chart.js.
 *       Suma el precio de los artículos en pedidos completados.
 *     tags: [Estadísticas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: meses
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *           default: 6
 *         description: Número de meses a mostrar ( por defecto 6 si no se especifica)
 *         example: 6
 *     responses:
 *       200:
 *         description: Datos del gráfico de ventas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VentasMensualesChartResponse'
 *             example:
 *               type: bar
 *               data:
 *                 labels: [Ene, Feb, Mar, Abr, May, Jun]
 *                 datasets:
 *                   - label: Ventas
 *                     data: [1200, 1800, 1500, 2200, 2800, 3100]
 *       400:
 *         description: Parámetro no válido
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
router.get('/ventas-mensuales', checkToken, checkAdmin, getVentasPorMeses);

module.exports = router;
