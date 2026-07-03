const router = require('express').Router();
const uploadIconoMiddleware = require('../../middleware/uploadIcono.middleware.js');
const {
    getCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
} = require('../../controllers/categorias.controller');
const { checkToken, checkAdmin } = require('../../middleware/auth.middleware');

const handleIconoUpload = (req, res, next) => {
    uploadIconoMiddleware.single('icono')(req, res, (error) => {
        if (error) {
            return res.status(400).json({ mensaje: error.message });
        }
        next();
    });
};

/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: Gestión de categorías de artículos
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Listar categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeErrorResponse'
 */
router.get('/', getCategorias);

/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categorías]
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
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoría no encontrada
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
router.get('/:id', getCategoriaById);

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Crear una categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [nombre, descripcion]
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Electrónica
 *               descripcion:
 *                 type: string
 *                 example: Artículos electrónicos y gadgets
 *               icono:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del icono de la categoría (se sube a Cloudinary)
 *     responses:
 *       201:
 *         description: Categoría creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeCreateResponse'
 *             example:
 *               mensaje: Categoría creada correctamente
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
router.post('/', checkToken, checkAdmin, handleIconoUpload, createCategoria);

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags: [Categorías]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [nombre, descripcion]
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Electrónica
 *               descripcion:
 *                 type: string
 *                 example: Artículos electrónicos y gadgets
 *               icono:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del icono de la categoría (se sube a Cloudinary)
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       404:
 *         description: Categoría no encontrada
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
router.put('/:id', checkToken, checkAdmin, handleIconoUpload, updateCategoria);

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría (borrado lógico)
 *     tags: [Categorías]
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
 *         description: Categoría eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       404:
 *         description: Categoría no encontrada
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
router.delete('/:id', checkToken, checkAdmin, deleteCategoria);

module.exports = router;
