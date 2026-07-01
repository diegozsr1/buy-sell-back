const db = require("../config/db.js");
const {
  getRangosPorTemporalidad,
  calcularVariacionPorcentaje,
  getUltimosMeses,
} = require("../utils/temporalidad.js");

const countEnRango = async (query, params, desde, hasta) => {
  const [rows] = await db.query(query, [...params, desde, hasta]);
  return Number(rows[0].total);
};

const getDashboard = async (temporalidad) => {
  const rangos = getRangosPorTemporalidad(temporalidad);
  const { actual, anterior, etiqueta } = rangos;

  const [
    articulosPublicadosActual,
    articulosPublicadosAnterior,
    usuariosActivosActual,
    usuariosActivosAnterior,
    reportesPendientes,
    totalReportes,
    articulosVendidosActual,
    articulosVendidosAnterior,
    totalCategorias,
    articulosRetiradosActual,
    articulosRetiradosAnterior,
  ] = await Promise.all([
    countEnRango(
      `SELECT COUNT(*) AS total FROM articulos
             WHERE estado_articulo_id = 'Publicado' AND created_at >= ? AND created_at < ?`,
      [],
      actual.desde,
      actual.hasta,
    ),
    countEnRango(
      `SELECT COUNT(*) AS total FROM articulos
             WHERE estado_articulo_id = 'Publicado' AND created_at >= ? AND created_at < ?`,
      [],
      anterior.desde,
      anterior.hasta,
    ),
    countEnRango(
      `SELECT COUNT(*) AS total FROM usuarios
             WHERE bloqueado = 0 AND estado = 1 AND created_at >= ? AND created_at < ?`,
      [],
      actual.desde,
      actual.hasta,
    ),
    countEnRango(
      `SELECT COUNT(*) AS total FROM usuarios
             WHERE bloqueado = 0 AND estado = 1 AND created_at >= ? AND created_at < ?`,
      [],
      anterior.desde,
      anterior.hasta,
    ),
    db
      .query(
        `SELECT COUNT(*) AS total FROM reportes WHERE estado = 'Pendiente' OR estado = 'Revisado'`,
      )
      .then(([rows]) => Number(rows[0].total)),
    db
      .query(`SELECT COUNT(*) AS total FROM reportes`)
      .then(([rows]) => Number(rows[0].total)),
    countEnRango(
      `SELECT COUNT(*) AS total FROM pedidos
             WHERE estado = 'Completado' AND fecha_pedido >= ? AND fecha_pedido < ?`,
      [],
      actual.desde,
      actual.hasta,
    ),
    countEnRango(
      `SELECT COUNT(*) AS total FROM pedidos
             WHERE estado = 'Completado' AND fecha_pedido >= ? AND fecha_pedido < ?`,
      [],
      anterior.desde,
      anterior.hasta,
    ),
    db
      .query(`SELECT COUNT(*) AS total FROM categorias`)
      .then(([rows]) => Number(rows[0].total)),
    countEnRango(
      `SELECT COUNT(*) AS total FROM articulos
             WHERE estado_articulo_id = 'Retirado' AND updated_at >= ? AND updated_at < ?`,
      [],
      actual.desde,
      actual.hasta,
    ),
    countEnRango(
      `SELECT COUNT(*) AS total FROM articulos
             WHERE estado_articulo_id = 'Retirado' AND updated_at >= ? AND updated_at < ?`,
      [],
      anterior.desde,
      anterior.hasta,
    ),
  ]);

  return {
    temporalidad,
    temporalidad_etiqueta: etiqueta,
    periodo: {
      desde: actual.desde.toISOString(),
      hasta: actual.hasta.toISOString(),
    },
    articulos_publicados: {
      total: articulosPublicadosActual,
      variacion_porcentaje: calcularVariacionPorcentaje(
        articulosPublicadosActual,
        articulosPublicadosAnterior,
      ),
    },
    usuarios_activos: {
      total: usuariosActivosActual,
      variacion_porcentaje: calcularVariacionPorcentaje(
        usuariosActivosActual,
        usuariosActivosAnterior,
      ),
    },
    reportes_pendientes: {
      total: reportesPendientes,
      total_reportes: totalReportes,
    },
    articulos_vendidos: {
      total: articulosVendidosActual,
      variacion_porcentaje: calcularVariacionPorcentaje(
        articulosVendidosActual,
        articulosVendidosAnterior,
      ),
    },
    categorias_activas: {
      total: totalCategorias,
      etiqueta: "Catálogo completo",
    },
    articulos_retirados: {
      total: articulosRetiradosActual,
      variacion_porcentaje: calcularVariacionPorcentaje(
        articulosRetiradosActual,
        articulosRetiradosAnterior,
      ),
    },
  };
};

const getVentasPorMeses = async (cantidadMeses) => {
  const meses = getUltimosMeses(cantidadMeses);
  const desde = new Date(meses[0].anio, meses[0].mes - 1, 1);

  const [rows] = await db.query(
    `SELECT YEAR(p.fecha_pedido) AS anio,
                MONTH(p.fecha_pedido) AS mes,
                COALESCE(SUM(a.precio), 0) AS total
         FROM pedidos p
         INNER JOIN articulos a ON a.id = p.articulos_id
         WHERE p.estado = 'Completado'
           AND p.fecha_pedido >= ?
         GROUP BY YEAR(p.fecha_pedido), MONTH(p.fecha_pedido)
         ORDER BY anio, mes`,
    [desde],
  );

  const ventasPorMes = new Map(
    rows.map((row) => [`${row.anio}-${row.mes}`, Number(row.total)]),
  );

  const labels = meses.map((m) => m.label);
  const data = meses.map((m) => ventasPorMes.get(`${m.anio}-${m.mes}`) ?? 0);

  return {
    data: {
      labels,
      datasets: [
        {
          label: "Ventas",
          data,
        },
      ],
    },
  };
};

module.exports = {
  getDashboard,
  getVentasPorMeses,
};
