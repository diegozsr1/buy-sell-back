const router = require('express').Router();
const {
    getUsuarios,
    countUsuarios,
    countUsuariosByRol,
    countUsuariosByBloqueado,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../../controllers/usuarios.controller');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /api/usuarios/count:
 *   get:
 *     summary: Contar usuarios
 *     description: Devuelve el número total de usuarios registrados.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Total de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CountResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Ha habido un error al consultar los datos
 */
router.get('/count', countUsuarios);

/**
 * @swagger
 * /api/usuarios/count/rol/{rol}:
 *   get:
 *     summary: Contar usuarios por rol
 *     description: Devuelve el número de usuarios que tienen el rol indicado.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: rol
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Usuario, Moderador, Administrador]
 *         description: Rol a filtrar
 *         example: Usuario
 *     responses:
 *       200:
 *         description: Total de usuarios con ese rol
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CountResponse'
 *       400:
 *         description: Rol no válido
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
router.get('/count/rol/:rol', countUsuariosByRol);

/**
 * @swagger
 * /api/usuarios/count/bloqueado/{bloqueado}:
 *   get:
 *     summary: Contar usuarios por estado de bloqueo
 *     description: Devuelve el número de usuarios bloqueados o no bloqueados según el valor indicado.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: bloqueado
 *         required: true
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: "0 = no bloqueado, 1 = bloqueado"
 *         example: 0
 *     responses:
 *       200:
 *         description: Total de usuarios con ese estado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CountResponse'
 *       400:
 *         description: Valor de bloqueado no válido
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
router.get('/count/bloqueado/:bloqueado', countUsuariosByBloqueado);
router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);

module.exports = router;
