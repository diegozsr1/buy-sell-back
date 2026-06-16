const yup = require('yup');

const TEMPORALIDADES_VALIDAS = ['1d', '1s', '1m', '6m', '1a', '3a'];

const dashboardQuerySchema = yup.object({
    temporalidad: yup
        .string()
        .oneOf(TEMPORALIDADES_VALIDAS, `La temporalidad debe ser una de: ${TEMPORALIDADES_VALIDAS.join(', ')}`)
        .required('La temporalidad es obligatoria')
        .default('1m'),
});

const ventasMensualesQuerySchema = yup.object({
    meses: yup
        .number()
        .integer('El número de meses debe ser un entero')
        .min(1, 'Debe mostrar al menos 1 mes')
        .max(12, 'No se pueden mostrar más de 12 meses')
        .default(6)
        .transform((value, originalValue) =>
            originalValue === '' || originalValue === undefined ? 6 : Number(originalValue)
        ),
});

module.exports = {
    dashboardQuerySchema,
    ventasMensualesQuerySchema,
};
