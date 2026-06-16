const EstadisticasModel = require('../models/estadisticas.model.js');
const {
    dashboardQuerySchema,
    ventasMensualesQuerySchema,
} = require('../schemas/estadisticas.schema.js');

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

const getDashboard = async (req, res) => {
    try {
        const { temporalidad } = await dashboardQuerySchema.validate(req.query, validationOptions);
        const resultado = await EstadisticasModel.getDashboard(temporalidad);
        res.json(resultado);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al consultar las estadísticas' });
    }
};

const getVentasPorMeses = async (req, res) => {
    try {
        const { meses } = await ventasMensualesQuerySchema.validate(req.query, validationOptions);
        const resultado = await EstadisticasModel.getVentasPorMeses(meses);
        res.json(resultado);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al consultar las ventas' });
    }
};

module.exports = {
    getDashboard,
    getVentasPorMeses,
};
