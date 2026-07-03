const ArticuloModel = require('../models/articulos.model.js');
const UsuarioModel = require('../models/usuarios.model.js');
const ReporteModel = require('../models/reportes.model.js');
const ArticulosExplorarService = require('../services/articulos-explorar.service.js');
const { articuloUsuarioIdSchema, articulosExplorarQuerySchema, articuloConFotosSchema } = require('../schemas/articulos.schema.js');
const { sendEmail } = require('../services/email.service.js');
const { uploadFotoArticulo, deleteImage } = require('../services/cloudinary.service.js');

const validationOptions = { abortEarly: false, stripUnknown: true };

const handleValidationError = (error, res) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            detalles: error.errors,
        });
    }
    return null;
};

// GET /articulos/explorar
const getArticulosExplorar = async (req, res) => {
    try {
        const filtros = await articulosExplorarQuerySchema.validate(req.query, validationOptions);
        const resultado = await ArticulosExplorarService.getArticulosExplorar(filtros);
        res.status(200).json(resultado);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        res.status(500).json({
            mensaje: 'Error al obtener los artículos para explorar',
            error: error.message,
        });
    }
};

// GET /articulos
const getArticulos = async (req, res) => {
    try {
        const rows = await ArticuloModel.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los artículos',
            error: error.message,
        });
    }
};

// GET /articulos by user
const getArticulosPorUsuario = async (req, res) => {
    const { user_id } = req.params;
    try {
        const rows = await ArticuloModel.getAllByUser(user_id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los artículos',
            error: error.message,
        });
    }
};

// GET /articulos/recientes
const getArticulosRecientes = async (req, res) => {
    try {
        const rows = await ArticuloModel.getRecientes();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los artículos recientes',
            error: error.message,
        });
    }
};

// GET /articulos/mas-vendidos
const getArticulosMasVendidos = async (req, res) => {
    try {
        const resultado = await ArticuloModel.getMasVendidos(10);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los artículos más vendidos',
            error: error.message,
        });
    }
};

// GET /articulos/:id
const getArticuloById = async (req, res) => {
    try {
        const { id } = req.params;
        const articulo = await ArticuloModel.getById(id);

        if (!articulo.articulos[0]) {
            return res.status(404).json({
                mensaje: 'Artículo no encontrado',
            });
        }

        res.status(200).json(articulo.articulos[0]);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener el artículo',
            error: error.message,
        });
    }
};

// POST /articulos
const createArticulo = async (req, res) => {
    try {
        const {
            usuarios_id,
            titulo,
            descripcion,
            categorias_id,
            precio,
            estado_conservacion_id,
            estado_articulo_id,
        } = req.body;

        if (
            !usuarios_id ||
            !titulo ||
            !descripcion ||
            !categorias_id ||
            precio === undefined ||
            !estado_conservacion_id ||
            !estado_articulo_id
        ) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios',
            });
        }

        const resultado = await ArticuloModel.create({
            usuarios_id,
            titulo,
            descripcion,
            categorias_id,
            precio,
            estado_conservacion_id,
            estado_articulo_id,
        });

        res.status(201).json({
            mensaje: 'Artículo creado correctamente',
            id: resultado.id,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear el artículo',
            error: error.message,
        });
    }
};

// POST /articulos/con-fotos
const createArticuloConFotos = async (req, res) => {
    const fotosSubidas = [];

    try {
        const files = req.files || [];

        let datos;
        try {
            datos = await articuloConFotosSchema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
                context: { filesCount: files.length },
            });
        } catch (error) {
            const validationResponse = handleValidationError(error, res);
            if (validationResponse) return validationResponse;
            throw error;
        }

        const principalIdx = datos.principal_index;
        const advertencias = [];

        for (let i = 0; i < files.length; i++) {
            try {
                const url_foto = await uploadFotoArticulo(files[i]);
                fotosSubidas.push({
                    index: i,
                    url_foto,
                    principal: i === principalIdx ? 1 : 0,
                });
            } catch (error) {
                advertencias.push({
                    index: i,
                    mensaje: error.message,
                });
            }
        }

        if (fotosSubidas.length === 0) {
            return res.status(400).json({
                mensaje: 'No se pudo subir ninguna imagen',
                advertencias,
            });
        }

        if (!fotosSubidas.some((foto) => foto.principal === 1)) {
            fotosSubidas[0].principal = 1;
            for (let i = 1; i < fotosSubidas.length; i++) {
                fotosSubidas[i].principal = 0;
            }
            advertencias.push({
                mensaje: 'La foto principal no se subió; se asignó la primera disponible',
            });
        }

        const resultado = await ArticuloModel.createWithFotos(
            {
                usuarios_id: datos.usuarios_id,
                titulo: datos.titulo,
                descripcion: datos.descripcion,
                categorias_id: datos.categorias_id,
                precio: datos.precio,
                estado_conservacion_id: datos.estado_conservacion_id,
                estado_articulo_id: datos.estado_articulo_id,
            },
            fotosSubidas.map(({ url_foto, principal }) => ({ url_foto, principal }))
        );

        const response = {
            mensaje: 'Artículo creado correctamente',
            id: resultado.id,
            fotos: resultado.fotos,
        };

        if (advertencias.length > 0) {
            response.advertencias = advertencias;
        }

        res.status(201).json(response);
    } catch (error) {
        await Promise.all(
            fotosSubidas.map((foto) => deleteImage(foto.url_foto))
        );

        res.status(500).json({
            mensaje: 'Error al crear el artículo con fotos',
            error: error.message,
        });
    }
};

// PUT /articulos/:id
const updateArticulo = async (req, res) => {
    try {
        const { id } = req.params;
        const articuloExistente = await ArticuloModel.getById(id);

        if (!articuloExistente) {
            return res.status(404).json({
                mensaje: 'Artículo no encontrado',
            });
        }

        const {
            usuarios_id,
            titulo,
            descripcion,
            categorias_id,
            precio,
            estado_conservacion_id,
            estado_articulo_id,
            nota
        } = req.body;

        // Fin del archivo que me mandaste
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

module.exports = {
    getArticulosExplorar,
    getArticulos,
    getArticulosPorUsuario,
    getArticulosRecientes,
    getArticulosMasVendidos,
    getArticuloById,
    createArticulo,
    createArticuloConFotos,
    updateArticulo
};
