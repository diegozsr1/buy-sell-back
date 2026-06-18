const ReporteModel = require('../models/reportes.model.js');
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
        const actualizado = await ReporteModel.update(id, datosValidados);

        if (!actualizado) {
            return res.status(404).json({ mensaje: 'Reporte no encontrado' });
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
