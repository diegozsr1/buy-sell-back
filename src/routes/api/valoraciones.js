const router = require('express').Router();
const {
    getPromedioRecibidasByUsuario,
    getValoraciones,
    getValoracionesByUser,
    getValoracionById,
    createValoracion,
    updateValoracion,
    deleteValoracion,
} = require('../../controllers/valoraciones.controller');
const { checkToken } = require('../../middleware/auth.middleware');

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

/**
 * @swagger
 * /api/valoraciones:
 *   get:
 *     summary: Listar valoraciones
 *     description: Devuelve todas las valoraciones registradas en la base de datos.
 *     security:
 *       - bearerAuth: []
 *     tags: [Valoraciones]
 *     responses:
 *       200:
 *         description: Lista de valoraciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Valoracion'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Ha habido un error al consultar los datos
 */
router.get('/', getValoraciones);

/**
 * @swagger
 * /api/valoraciones/usuario/get-all/{user_id}:
 *   get:
 *     summary: Listar valoraciones recibidas por un usuario
 *     description: Devuelve todas las valoraciones realizadas sobre los artículos publicados por el usuario indicado, incluyendo datos del valorador y los días transcurridos desde la valoración.
 *     tags: [Valoraciones]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario dueño de los artículos valorados
 *         example: 6
 *     responses:
 *       200:
 *         description: Lista de valoraciones recibidas por el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ValoracionPorUsuario'
 *             examples:
 *               conValoraciones:
 *                 summary: Usuario con valoraciones recibidas
 *                 value:
 *                   - id: 1
 *                     usuario_valorador_id: 3
 *                     articulos_id: 12
 *                     puntuacion: 4.5
 *                     mensaje: Muy buen estado y trato excelente.
 *                     creada_en: '2026-06-15T10:30:00.000Z'
 *                     usuarios_id: 6
 *                     nombre: Lucía
 *                     apellidos: Ramírez
 *                     dias_transcurridos: 3
 *               sinValoraciones:
 *                 summary: Usuario sin valoraciones recibidas
 *                 value: []
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Ha habido un error al consultar los datos
 */
router.get('/usuario/get-all/:user_id', getValoracionesByUser);

/**
 * @swagger
 * /api/valoraciones/{id}:
 *   get:
 *     summary: Obtener una valoración por ID
 *     description: Devuelve los datos de una valoración concreta.
 *     tags: [Valoraciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de la valoración
 *         example: 1
 *     responses:
 *       200:
 *         description: Valoración encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Valoracion'
 *       404:
 *         description: Valoración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValoracionMensajeResponse'
 *             example:
 *               mensaje: Valoración no encontrada
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Ha habido un error al consultar los datos
 */
router.get('/:id', getValoracionById);

/**
 * @swagger
 * /api/valoraciones:
 *   post:
 *     summary: Crear una valoración
 *     description: Registra una nueva valoración para un artículo.
 *     tags: [Valoraciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValoracionRequest'
 *           example:
 *             usuario_valorador_id: 3
 *             articulos_id: 12
 *             puntuacion: 4.5
 *             mensaje: Muy buen estado y trato excelente.
 *     responses:
 *       201:
 *         description: Valoración creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValoracionCreateResponse'
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
 *             example:
 *               error: Ha habido un error al crear la valoración
 */
router.post('/', checkToken, createValoracion);

/**
 * @swagger
 * /api/valoraciones/{id}:
 *   put:
 *     summary: Actualizar una valoración
 *     description: Modifica los datos de una valoración existente.
 *     tags: [Valoraciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de la valoración
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValoracionRequest'
 *           example:
 *             usuario_valorador_id: 3
 *             articulos_id: 12
 *             puntuacion: 5
 *             mensaje: Excelente experiencia de compra.
 *     responses:
 *       200:
 *         description: Valoración actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValoracionMensajeResponse'
 *             example:
 *               mensaje: Valoración actualizada correctamente
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Valoración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValoracionMensajeResponse'
 *             example:
 *               mensaje: Valoración no encontrada
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Ha habido un error al actualizar la valoración
 */
router.put('/:id', checkToken, updateValoracion);

/**
 * @swagger
 * /api/valoraciones/{id}:
 *   delete:
 *     summary: Eliminar una valoración
 *     description: Elimina una valoración por su ID.
 *     tags: [Valoraciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de la valoración
 *         example: 1
 *     responses:
 *       200:
 *         description: Valoración eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValoracionMensajeResponse'
 *             example:
 *               mensaje: Valoración eliminada correctamente
 *       404:
 *         description: Valoración no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValoracionMensajeResponse'
 *             example:
 *               mensaje: Valoración no encontrada
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Ha habido un error al eliminar la valoración
 */
router.delete('/:id', checkToken, deleteValoracion);

module.exports = router;
