const yup = require('yup');

const TEMPORALIDADES_VALIDAS = ['1d', '1s', '1m', '6m', '1a', '3a'];

const dashboardQuerySchema = yup.object({
    temporalidad: yup
        .string()
        .oneOf(TEMPORALIDADES_VALIDAS, `La temporalidad debe ser una de: ${TEMPORALIDADES_VALIDAS.join(', ')}`)
        .required('La temporalidad es obligatoria')
        .default('1m'),
});

module.exports = {
    dashboardQuerySchema,
};
