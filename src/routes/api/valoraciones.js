const router = require('express').Router();
const {
    getPromedioRecibidasByUsuario,
    getValoraciones,
    getValoracionById,
    createValoracion,
    updateValoracion,
    deleteValoracion,
} = require('../../controllers/valoraciones.controller');

/**
 * @swagger
 * tags:
 *   name: Valoraciones
 *   description: Gestión de valoraciones de artículos
 */

/**
 * @swagger
 * /api/valoraciones/usuario/{usuarioId}/promedio:
 *   get:
 *     summary: Promedio de valoraciones recibidas por un usuario
 *     description: Devuelve la puntuación media y el total de valoraciones que otros usuarios han dejado en los artículos publicados por el usuario indicado.
 *     tags: [Valoraciones]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario dueño de los artículos valorados
 *         example: 5
 *     responses:
 *       200:
 *         description: Promedio de valoraciones recibidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PromedioValoracionesRecibidasResponse'
 *             examples:
 *               conValoraciones:
 *                 summary: Usuario con valoraciones
 *                 value:
 *                   usuario_id: 5
 *                   puntuacion_media: 4.5
 *                   total_valoraciones: 12
 *               sinValoraciones:
 *                 summary: Usuario sin valoraciones
 *                 value:
 *                   usuario_id: 5
 *                   puntuacion_media: null
 *                   total_valoraciones: 0
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
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Ha habido un error al consultar los datos
 */
router.get('/usuario/:usuarioId/promedio', getPromedioRecibidasByUsuario);
router.get('/', getValoraciones);
router.get('/:id', getValoracionById);
router.post('/', createValoracion);
router.put('/:id', updateValoracion);
router.delete('/:id', deleteValoracion);

module.exports = router;
