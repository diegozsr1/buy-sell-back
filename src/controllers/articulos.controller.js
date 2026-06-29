const ArticuloModel = require('../models/articulos.model.js');
const UsuarioModel = require('../models/usuarios.model.js');
const ReporteModel = require('../models/reportes.model.js');
const ArticulosExplorarService = require('../services/articulos-explorar.service.js');
const { articuloUsuarioIdSchema, articulosExplorarQuerySchema } = require('../schemas/articulos.schema.js');
const { sendEmail } = require('../services/email.service.js');

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

        await ArticuloModel.update(id, {
            usuarios_id,
            titulo,
            descripcion,
            categorias_id,
            precio,
            estado_conservacion_id,
            estado_articulo_id,
        });

        if(estado_articulo_id){
            
            const rows = await ReporteModel.getAllByArticleId(id);
            let cuerpo=`Hola ${rows[0].nombre}. En referencia a su artículo "${rows[0].titulo}" tiene un total de `;
            
            for (const row of rows) {
                cuerpo+=`${row.total} reporte/s en estado: ${row.estado} y `;
            }
            
            cuerpo=cuerpo.slice(0,-2);
            
             try {
                if (rows[0]?.email) {
                    await sendEmail({
                        to: rows[0].email,
                        subject: `Se ha resuelto su revisión sobre el artículo ${rows[0].titulo}`,
                        body: `
                            <p>${cuerpo}</p>
                            <p>${(nota)?`Comentario del moderador: ${nota}`:''}</p>
                            <p>El artículo ha sido ${(estado_articulo_id==='Publicado')?'Reactivado':'Retirado'}</p>                         
                        `,
                        isHtml: true,
                    });
                }
            } catch (emailError) {
                console.error('Error al enviar correo:', emailError);
            }
        }
        
        
        
           
        
        
        res.status(200).json({
            mensaje: 'Artículo actualizado correctamente',
        });
        
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar el artículo',
            error: error.message,
        });
    }
};

const updateArticuloAndCP = async (req, res) => {

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
            categoria,
            precio,
            ubicacion,
            estado_conservacion_id,
            estado_articulo_id,
        } = req.body;

        await ArticuloModel.update(id, {
            usuarios_id,
            titulo,
            descripcion,
            categorias_id: categoria,
            precio,
            estado_conservacion_id,
            estado_articulo_id,
        });

        await UsuarioModel.updateCP(usuarios_id, ubicacion);

        res.status(200).json({
            mensaje: 'Artículo actualizado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar el artículo',
            error: error.message,
        });
    }

};

// DELETE /articulos/:id — baja lógica: pasa el artículo a estado Retirado

const deleteArticulo = async (req, res) => {
    try {
        const { id } = req.params;
        const articuloExistente = await ArticuloModel.getById(id);

        if (!articuloExistente) {
            return res.status(404).json({
                mensaje: 'Artículo no encontrado',
            });
        }

        await ArticuloModel.deleteById(id);

        res.status(200).json({
            mensaje: 'Artículo retirado correctamente',
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al retirar el artículo',
            error: error.message,
        });
    }
};

const getArticulosPublicadosByUsuario = async (req, res) => {
    try {
        const { usuarioId } = await articuloUsuarioIdSchema.validate(req.params, validationOptions);
        const resultado = await ArticuloModel.countPublicadosByUsuarioId(usuarioId);
        res.status(200).json(resultado);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({
            mensaje: 'Error al obtener los artículos publicados',
            error: error.message,
        });
    }
};

module.exports = {
    getArticulos,
    getArticulosExplorar,
    getArticulosPorUsuario,
    getArticulosRecientes,
    getArticulosMasVendidos,
    getArticuloById,
    getArticulosPublicadosByUsuario,
    createArticulo,
    updateArticulo,
    updateArticuloAndCP,
    deleteArticulo
};
