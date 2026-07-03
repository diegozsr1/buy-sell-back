const ReporteModel = require('../models/reportes.model.js');
const NotificacionModel = require('../models/notificaciones.model.js');
const ArticuloModel = require('../models/articulos.model.js');
const UsuarioModel = require('../models/usuarios.model.js');
const { reporteIdSchema, reporteSchema } = require('../schemas/reportes.schema.js');

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

const truncarMensaje = (texto, max = 255) => {
    if (!texto || texto.length <= max) return texto;
    return `${texto.slice(0, max - 3)}...`;
};

const ESTADOS_RESUELTOS = ['Aceptado', 'Descartado'];

const esEstadoResuelto = (estado) =>
    ESTADOS_RESUELTOS.some((item) => item.toLowerCase() === String(estado ?? '').toLowerCase());

const crearNotificacionesReporte = async (datos, reporteId) => {
    if (!datos.articulos_id) return;

    const articulo = await ArticuloModel.getById(datos.articulos_id);
    const tituloArticulo = articulo.articulos[0]?.titulo ?? 'Artículo reportado';

    if (
        datos.usuario_reportado_id &&
        datos.usuario_reportado_id !== datos.usuario_reportante_id
    ) {
        await NotificacionModel.create({
            usuarios_id: datos.usuario_reportado_id,
            articulos_id: datos.articulos_id,
            tipo: 'moderation',
            titulo: 'Artículo reportado',
            mensaje: truncarMensaje(
                `Tu artículo "${tituloArticulo}" ha sido reportado y está en revisión.`
            ),
            redirect_url: '/user/panel/sales',
        });
    }

    const moderadores = await UsuarioModel.getIdsByRoles(['Moderador', 'Administrador']);

    await Promise.all(
        moderadores.map((moderadorId) =>
            NotificacionModel.create({
                usuarios_id: moderadorId,
                articulos_id: datos.articulos_id,
                tipo: 'moderation',
                titulo: 'Nuevo reporte pendiente',
                mensaje: truncarMensaje(
                    `Reporte #${reporteId} sobre "${tituloArticulo}": ${datos.motivo}`
                ),
                redirect_url: `/moderator/panel/incident/${datos.articulos_id}`,
            })
        )
    );
};

const crearNotificacionResolucionReporte = async (reporteAnterior, datos, reporteId) => {
    if (!esEstadoResuelto(datos.estado)) return;
    if (esEstadoResuelto(reporteAnterior.estado)) return;
    if (!datos.articulos_id) return;

    const articulo = await ArticuloModel.getById(datos.articulos_id);
    const tituloArticulo = articulo.articulos[0]?.titulo ?? 'Artículo reportado';
    const resolucion = datos.resultado_reporte?.trim();
    const aceptado = datos.estado.toLowerCase() === 'aceptado';
    const titulo = aceptado ? 'Resolución: reporte aceptado' : 'Resolución: reporte descartado';

    const mensajeVendedor = aceptado
        ? resolucion
            ? `Se aceptó el reporte sobre "${tituloArticulo}". Resolución: ${resolucion}`
            : `Se aceptó el reporte sobre "${tituloArticulo}". Se han aplicado las medidas correspondientes.`
        : resolucion
            ? `Se descartó el reporte sobre "${tituloArticulo}". Resolución: ${resolucion}`
            : `Se descartó el reporte sobre "${tituloArticulo}". Tu artículo puede continuar publicado.`;

    if (datos.usuario_reportado_id) {
        await NotificacionModel.create({
            usuarios_id: datos.usuario_reportado_id,
            articulos_id: datos.articulos_id,
            tipo: 'moderation',
            titulo,
            mensaje: truncarMensaje(mensajeVendedor),
            redirect_url: '/user/panel/sales',
        });
    }

    if (
        datos.usuario_reportante_id &&
        datos.usuario_reportante_id !== datos.usuario_reportado_id
    ) {
        const mensajeReportante = aceptado
            ? resolucion
                ? `Tu reporte #${reporteId} sobre "${tituloArticulo}" fue aceptado. ${resolucion}`
                : `Tu reporte #${reporteId} sobre "${tituloArticulo}" fue aceptado.`
            : resolucion
                ? `Tu reporte #${reporteId} sobre "${tituloArticulo}" fue descartado. ${resolucion}`
                : `Tu reporte #${reporteId} sobre "${tituloArticulo}" fue descartado.`;

        await NotificacionModel.create({
            usuarios_id: datos.usuario_reportante_id,
            articulos_id: datos.articulos_id,
            tipo: 'moderation',
            titulo,
            mensaje: truncarMensaje(mensajeReportante),
            redirect_url: '/user/panel/my-purchases',
        });
    }
};

const getReportes = async (req, res) => {
    try {
        const resultado = await ReporteModel.getAll();
        res.json(resultado);
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const getReporteById = async (req, res) => {
    try {
        const { id } = await reporteIdSchema.validate(req.params, validationOptions);
        const resultado = await ReporteModel.getById(id);

        if (!resultado) {
            return res.status(404).json({ mensaje: 'Reporte no encontrado' });
        }

        res.json(resultado);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const createReporte = async (req, res) => {
    try {
        const datosValidados = await reporteSchema.validate(req.body, validationOptions);
        const resultado = await ReporteModel.create(datosValidados);

        try {
            await crearNotificacionesReporte(datosValidados, resultado.id);
        } catch (notificacionError) {
            console.error('Error al crear notificaciones del reporte:', notificacionError);
        }

        res.status(201).json({
            id: resultado.id,
            mensaje: 'Reporte creado correctamente',
        });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al crear el reporte' });
    }
};

const updateReporte = async (req, res) => {
    try {
        const { id } = await reporteIdSchema.validate(req.params, validationOptions);
        const datosValidados = await reporteSchema.validate(req.body, validationOptions);
        const reporteAnterior = await ReporteModel.getById(id);

        if (!reporteAnterior) {
            return res.status(404).json({ mensaje: 'Reporte no encontrado' });
        }

        await ReporteModel.update(id, datosValidados);

        try {
            await crearNotificacionResolucionReporte(reporteAnterior, datosValidados, id);
        } catch (notificacionError) {
            console.error('Error al crear notificación de resolución del reporte:', notificacionError);
        }

        res.json({ mensaje: 'Reporte actualizado correctamente' });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al actualizar el reporte' });
    }
};

const deleteReporte = async (req, res) => {
    try {
        const { id } = await reporteIdSchema.validate(req.params, validationOptions);
        const eliminado = await ReporteModel.deleteById(id);

        if (!eliminado) {
            return res.status(404).json({ mensaje: 'Reporte no encontrado' });
        }

        res.json({ mensaje: 'Reporte eliminado correctamente' });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al eliminar el reporte' });
    }
};

module.exports = {
    getReportes,
    getReporteById,
    createReporte,
    updateReporte,
    deleteReporte,
};
