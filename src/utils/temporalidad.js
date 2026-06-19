const TEMPORALIDADES = {
    '1d': { dias: 1, etiqueta: '1 día' },
    '1s': { dias: 7, etiqueta: '1 semana' },
    '1m': { dias: 30, etiqueta: '1 mes' },
    '6m': { dias: 180, etiqueta: '6 meses' },
    '1a': { dias: 365, etiqueta: '1 año' },
    '3a': { dias: 1095, etiqueta: '3 años' },
};

const getRangosPorTemporalidad = (temporalidad) => {
    const config = TEMPORALIDADES[temporalidad];
    const ahora = new Date();

    const actualHasta = ahora;
    const actualDesde = new Date(ahora);
    actualDesde.setDate(actualDesde.getDate() - config.dias);

    const anteriorHasta = new Date(actualDesde);
    const anteriorDesde = new Date(actualDesde);
    anteriorDesde.setDate(anteriorDesde.getDate() - config.dias);

    return {
        etiqueta: config.etiqueta,
        actual: { desde: actualDesde, hasta: actualHasta },
        anterior: { desde: anteriorDesde, hasta: anteriorHasta },
    };
};

const calcularVariacionPorcentaje = (actual, anterior) => {
    if (anterior === 0) {
        return actual > 0 ? 100 : 0;
    }

    return Math.round(((actual - anterior) / anterior) * 100);
};

const MESES_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const getUltimosMeses = (cantidad) => {
    const meses = [];
    const ahora = new Date();

    for (let i = cantidad - 1; i >= 0; i--) {
        const fecha = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
        meses.push({
            anio: fecha.getFullYear(),
            mes: fecha.getMonth() + 1,
            label: MESES_ES[fecha.getMonth()],
        });
    }

    return meses;
};

module.exports = {
    TEMPORALIDADES,
    getRangosPorTemporalidad,
    calcularVariacionPorcentaje,
    MESES_ES,
    getUltimosMeses,
};
