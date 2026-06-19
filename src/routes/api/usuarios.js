const router = require('express').Router();
const {
    getUsuarios,
    countUsuarios,
    countUsuariosByRol,
    countUsuariosByBloqueado,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    updateUsuarioRol,
    updateUsuarioBloqueado,
    deleteUsuario
} = require('../../controllers/usuarios.controller');
const { checkToken } = require('../../middleware/auth.middleware');

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
 *     security:
 *       - bearerAuth: []
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
router.get('/count', checkToken, countUsuarios);

/**
 * @swagger
 * /api/usuarios/count/rol/{rol}:
 *   get:
 *     summary: Contar usuarios por rol
 *     description: Devuelve el número de usuarios que tienen el rol indicado.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
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
router.get('/count/rol/:rol', checkToken, countUsuariosByRol);

/**
 * @swagger
 * /api/usuarios/count/bloqueado/{bloqueado}:
 *   get:
 *     summary: Contar usuarios por estado de bloqueo
 *     description: Devuelve el número de usuarios bloqueados o no bloqueados según el valor indicado.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
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
router.get('/count/bloqueado/:bloqueado', checkToken, countUsuariosByBloqueado);

/**
 * @swagger
 * /api/usuarios/{id}/rol/{rol}:
 *   patch:
 *     summary: Actualizar rol de un usuario
 *     description: Actualiza únicamente el rol (roles_id) de un usuario existente.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario
 *         example: 1
 *       - in: path
 *         name: rol
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Usuario, Moderador, Administrador]
 *         description: Nuevo rol del usuario
 *         example: Moderador
 *     responses:
 *       200:
 *         description: Rol actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Ha habido un error al actualizar el rol del usuario
 */
router.patch('/:id/rol/:rol', checkToken, updateUsuarioRol);

/**
 * @swagger
 * /api/usuarios/{id}/bloqueado/{bloqueado}:
 *   patch:
 *     summary: Actualizar estado de bloqueo de un usuario
 *     description: Actualiza únicamente el estado de bloqueo (bloqueado) de un usuario existente.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario
 *         example: 1
 *       - in: path
 *         name: bloqueado
 *         required: true
 *         schema:
 *           type: integer
 *           enum: [0, 1]
 *         description: "0 = no bloqueado, 1 = bloqueado"
 *         example: 1
 *     responses:
 *       200:
 *         description: Estado de bloqueo actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Ha habido un error al actualizar el estado de bloqueo del usuario
 */
router.patch('/:id/bloqueado/:bloqueado', checkToken, updateUsuarioBloqueado);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar usuarios
 *     description: Devuelve todos los usuarios registrados (sin contraseña).
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Ha habido un error al consultar los datos
 */
router.get('/', checkToken, getUsuarios);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear usuario
 *     description: Registra un nuevo usuario en el sistema.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioRequest'
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
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

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     description: Devuelve los datos de un usuario (sin contraseña).
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: ID no válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   put:
 *     summary: Actualizar usuario
 *     description: Actualiza los datos de un usuario existente.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioRequest'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   delete:
 *     summary: Eliminar usuario
 *     description: Elimina un usuario del sistema.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del usuario
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteUsuarioResponse'
 *       400:
 *         description: ID no válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);
router.put('/:id', checkToken, updateUsuario);
router.delete('/:id', checkToken, deleteUsuario);

module.exports = router;
