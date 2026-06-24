const router = require('express').Router();
const {
    getUsuariosFavoritosByUser,
    createUsuarioFavorito,
    deleteUsuarioFavorito,
} = require('../../controllers/usuarios_favoritos.controller');
const { checkToken } = require('../../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: UsuariosFavoritos
 *   description: Gestión de usuarios favoritos
 */

/**
 * @swagger
 * /api/usuarios-favoritos/usuario/{user_id}:
 *   get:
 *     summary: Listar usuarios favoritos de un usuario
 *     description: Devuelve los usuarios marcados como favoritos por el usuario indicado, incluyendo datos básicos del perfil y su valoración media.
 *     tags: [UsuariosFavoritos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario propietario de la lista de favoritos
 *         example: 3
 *     responses:
 *       200:
 *         description: Lista de usuarios favoritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsuarioFavoritoListItem'
 *             examples:
 *               conFavoritos:
 *                 summary: Usuario con favoritos
 *                 value:
 *                   - id: 1
 *                     usuarios_id: 3
 *                     usuario_favorito_id: 6
 *                     created_at: '2026-06-15T10:30:00.000Z'
 *                     nombre: Lucía
 *                     apellidos: Ramírez
 *                     username: luciar
 *                     foto: null
 *                     cantidad_valoraciones: 12
 *                     puntuacion: 4.5
 *               sinFavoritos:
 *                 summary: Usuario sin favoritos
 *                 value: []
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeErrorResponse'
 */
router.get('/usuario/:user_id', checkToken, getUsuariosFavoritosByUser);

/**
 * @swagger
 * /api/usuarios-favoritos:
 *   post:
 *     summary: Agregar un usuario favorito
 *     tags: [UsuariosFavoritos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioFavoritoRequest'
 *           example:
 *             usuarios_id: 3
 *             usuario_favorito_id: 6
 *     responses:
 *       201:
 *         description: Usuario favorito creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeCreateResponse'
 *             example:
 *               mensaje: Usuario favorito creado correctamente
 *               id: 1
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       404:
 *         description: Usuario favorito no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       409:
 *         description: El usuario ya está en favoritos
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
router.post('/', checkToken, createUsuarioFavorito);

/**
 * @swagger
 * /api/usuarios-favoritos/{id}:
 *   delete:
 *     summary: Eliminar un usuario favorito
 *     tags: [UsuariosFavoritos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del registro en usuarios_favoritos
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario favorito eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *             example:
 *               mensaje: Usuario favorito eliminado correctamente
 *       404:
 *         description: Usuario favorito no encontrado
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
router.delete('/:id', checkToken, deleteUsuarioFavorito);

module.exports = router;
