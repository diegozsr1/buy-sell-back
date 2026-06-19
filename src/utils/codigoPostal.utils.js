const { provinces } = require('all-spanish-cities');

const getProvinciaCodigoFromCp = (cp) => {
    if (!cp || String(cp).length < 2) return null;
    return String(cp).substring(0, 2);
};

const getProvinciaFromCp = (cp) => {
    const codigo = getProvinciaCodigoFromCp(cp);
    if (!codigo) return null;

    const found = provinces({ code: codigo });
    if (!found.length) {
        return { codigo, nombre: null };
    }

    return { codigo: found[0].code, nombre: found[0].name };
};

const calcularModaPonderada = (items, getValor) => {
    const acumulado = new Map();

    for (const item of items) {
        const valor = getValor(item);
        if (valor == null || valor === '') continue;

        const peso = Number(item.total_ventas) || 0;
        acumulado.set(valor, (acumulado.get(valor) || 0) + peso);
    }

    if (acumulado.size === 0) return null;

    let valorModa = null;
    let totalVentas = -1;

    for (const [valor, ventas] of acumulado) {
        if (ventas > totalVentas) {
            totalVentas = ventas;
            valorModa = valor;
        }
    }
    return { valor: valorModa, total_ventas: totalVentas };
};

const calcularZonaModa = (articulos) => {
    const modaCp = calcularModaPonderada(articulos, (articulo) => articulo.cp);
    const modaProvincia = calcularModaPonderada(articulos, (articulo) =>
        getProvinciaCodigoFromCp(articulo.cp)
    );

    let provincia = null;
    if (modaProvincia) {
        const datosProvincia = getProvinciaFromCp(`${modaProvincia.valor}000`);
        provincia = {
            codigo: datosProvincia?.codigo ?? modaProvincia.valor,
            nombre: datosProvincia?.nombre ?? null,
            total_ventas: modaProvincia.total_ventas,
        };
    }

    return {
        cp: modaCp,
        provincia,
    };
};

module.exports = {
    getProvinciaCodigoFromCp,
    getProvinciaFromCp,
    calcularModaPonderada,
    calcularZonaModa,
};
