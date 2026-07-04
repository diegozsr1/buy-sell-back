const db = require('../config/db.js');
const { getProvinciaFromCp } = require('../utils/codigoPostal.utils.js');

const ESTADOS_VISIBLES = ['Publicado', 'Vendido'];
const ORDEN_VALIDO = ['relevancia', 'precio-asc', 'precio-desc', 'recientes'];
const POR_PAGINA_DEFAULT = 12;
const POR_PAGINA_MAX = 50;

const parseEnterosLista = (valor) => {
    if (!valor) return [];
    return String(valor)
        .split(',')
        .map((item) => Number(item.trim()))
        .filter((item) => Number.isInteger(item) && item > 0);
};

const parseEstadosConservacion = (valor) => {
    if (!valor) return [];
    return String(valor)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
};

const normalizarFiltros = (query = {}) => {
    const pagina = Math.max(1, Number(query.pagina) || 1);
    const porPaginaSolicitada = Number(query.por_pagina) || POR_PAGINA_DEFAULT;
    const porPagina = Math.min(Math.max(1, porPaginaSolicitada), POR_PAGINA_MAX);
    const ordenar = ORDEN_VALIDO.includes(query.ordenar) ? query.ordenar : 'relevancia';

    return {
        pagina,
        porPagina,
        offset: (pagina - 1) * porPagina,
        q: query.q?.trim() || '',
        categoriasId: parseEnterosLista(query.categorias_id),
        precioMin: query.precio_min !== undefined && query.precio_min !== ''
            ? Number(query.precio_min)
            : null,
        precioMax: query.precio_max !== undefined && query.precio_max !== ''
            ? Number(query.precio_max)
            : null,
        estadosConservacion: parseEstadosConservacion(query.estado_conservacion),
        ubicacion: query.ubicacion?.trim() || '',
        ordenar,
        usuario_id: Number(query.usuario_id) || null,
    };
};

const buildWhere = (filtros) => {
    const condiciones = [`a.estado_articulo_id IN (${ESTADOS_VISIBLES.map(() => '?').join(', ')})`];
    const params = [...ESTADOS_VISIBLES];

    if (filtros.q) {
        condiciones.push('(a.titulo LIKE ? OR a.descripcion LIKE ?)');
        const termino = `%${filtros.q}%`;
        params.push(termino, termino);
    }

    if (filtros.categoriasId.length > 0) {
        condiciones.push(`a.categorias_id IN (${filtros.categoriasId.map(() => '?').join(', ')})`);
        params.push(...filtros.categoriasId);
    }

    if (filtros.precioMin !== null && !Number.isNaN(filtros.precioMin)) {
        condiciones.push('a.precio >= ?');
        params.push(filtros.precioMin);
    }

    if (filtros.precioMax !== null && !Number.isNaN(filtros.precioMax)) {
        condiciones.push('a.precio <= ?');
        params.push(filtros.precioMax);
    }

    if (filtros.estadosConservacion.length > 0) {
        condiciones.push(
            `a.estado_conservacion_id IN (${filtros.estadosConservacion.map(() => '?').join(', ')})`
        );
        params.push(...filtros.estadosConservacion);
    }

    if (filtros.ubicacion) {
        condiciones.push('(u.cp LIKE ? OR u.`zona_geográfica` LIKE ?)');
        const terminoUbicacion = `%${filtros.ubicacion}%`;
        params.push(terminoUbicacion, terminoUbicacion);
    }

    if (filtros.usuario_id) {
        condiciones.push('a.usuarios_id != ?');
        params.push(filtros.usuario_id);
    }


    return {
        sql: condiciones.length ? `WHERE ${condiciones.join(' AND ')}` : '',
        params,
    };
};

const buildOrderBy = (filtros) => {
    switch (filtros.ordenar) {
        case 'precio-asc':
            return 'ORDER BY a.precio ASC, a.updated_at DESC';
        case 'precio-desc':
            return 'ORDER BY a.precio DESC, a.updated_at DESC';
        case 'recientes':
            return 'ORDER BY a.created_at DESC';
        case 'relevancia':
        default:
            if (filtros.q) {
                return `ORDER BY
                    CASE
                        WHEN a.titulo LIKE ? THEN 0
                        WHEN a.descripcion LIKE ? THEN 1
                        ELSE 2
                    END,
                    a.updated_at DESC`;
            }
            return 'ORDER BY a.updated_at DESC';
    }
};

const getOrderParams = (filtros) => {
    if (filtros.ordenar === 'relevancia' && filtros.q) {
        const termino = `%${filtros.q}%`;
        return [termino, termino];
    }
    return [];
};

const formatUbicacion = (provincia, zonaGeografica, cp) => {
    const partes = [];
    if (provincia?.nombre) partes.push(provincia.nombre);
    if (zonaGeografica) partes.push(zonaGeografica);
    else if (cp) partes.push(cp);
    return partes.length ? partes.join(', ') : null;
};

const getRolVendedor = (totalPublicados, totalValoraciones, createdAt) => {
    const publicados = Number(totalPublicados) || 0;
    const valoraciones = Number(totalValoraciones) || 0;
    const diasCuenta = createdAt
        ? Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24))
        : 999;

    if (publicados >= 5 || valoraciones >= 50) return 'pro';
    if (diasCuenta <= 90 || valoraciones < 5) return 'nuevo';
    return null;
};

const mapArticuloExplorar = (row) => {
    const provincia = getProvinciaFromCp(row.vendedor_cp);
    const puntuacionMedia =
        row.puntuacion_media !== null && row.puntuacion_media !== undefined
            ? Number(Number(row.puntuacion_media).toFixed(1))
            : null;

    return {
        id: row.id,
        titulo: row.titulo,
        descripcion: row.descripcion,
        precio: Number(row.precio),
        precio_anterior: null,
        estado_conservacion_id: row.estado_conservacion_id,
        estado_articulo_id: row.estado_articulo_id,
        vendido: row.estado_articulo_id === 'Vendido',
        categorias_id: row.categorias_id,
        categoria: row.categoria_nombre
            ? { id: row.categorias_id, nombre: row.categoria_nombre }
            : null,
        url_foto: row.url_foto ?? null,
        created_at: row.created_at,
        updated_at: row.updated_at,
        ubicacion: formatUbicacion(provincia, row.vendedor_zona, row.vendedor_cp),
        provincia,
        vendedor: {
            id: row.vendedor_id,
            nombre: row.vendedor_nombre,
            apellidos: row.vendedor_apellidos,
            username: row.vendedor_username,
            rol_vendedor: getRolVendedor(
                row.vendedor_total_publicados,
                row.total_valoraciones,
                row.vendedor_created_at
            ),
            valoracion: {
                puntuacion_media: puntuacionMedia,
                total_valoraciones: Number(row.total_valoraciones) || 0,
            },
        },
    };
};

const SQL_BASE_FROM = `
    FROM articulos a
    INNER JOIN usuarios u ON u.id = a.usuarios_id
    LEFT JOIN categorias c ON c.id = a.categorias_id
    LEFT JOIN articulo_fotos f ON f.articulos_id = a.id AND f.principal = 1
    LEFT JOIN (
        SELECT
            a2.usuarios_id,
            AVG(v.puntuacion) AS puntuacion_media,
            COUNT(v.id) AS total_valoraciones
        FROM valoraciones v
        INNER JOIN articulos a2 ON a2.id = v.articulos_id
        GROUP BY a2.usuarios_id
    ) val ON val.usuarios_id = u.id
    LEFT JOIN (
        SELECT usuarios_id, COUNT(*) AS total_publicados
        FROM articulos
        WHERE estado_articulo_id = 'Publicado'
        GROUP BY usuarios_id
    ) pub ON pub.usuarios_id = u.id
`;

const SQL_SELECT = `
    SELECT
        a.id,
        a.titulo,
        a.descripcion,
        a.precio,
        a.estado_conservacion_id,
        a.estado_articulo_id,
        a.categorias_id,
        a.created_at,
        a.updated_at,
        c.nombre AS categoria_nombre,
        f.url_foto,
        u.id AS vendedor_id,
        u.nombre AS vendedor_nombre,
        u.apellidos AS vendedor_apellidos,
        u.username AS vendedor_username,
        u.cp AS vendedor_cp,
        u.\`zona_geográfica\` AS vendedor_zona,
        u.created_at AS vendedor_created_at,
        COALESCE(pub.total_publicados, 0) AS vendedor_total_publicados,
        val.puntuacion_media,
        COALESCE(val.total_valoraciones, 0) AS total_valoraciones
`;

const getArticulosExplorar = async (query = {}) => {
    const filtros = normalizarFiltros(query);
    const { sql: whereSql, params: whereParams } = buildWhere(filtros);
    const orderBy = buildOrderBy(filtros);
    const orderParams = getOrderParams(filtros);

    const countSql = `
        SELECT COUNT(*) AS total
        ${SQL_BASE_FROM}
        ${whereSql}
    `;

    const [countRows] = await db.query(countSql, whereParams);
    const total = Number(countRows[0]?.total || 0);
    const totalPaginas = total > 0 ? Math.ceil(total / filtros.porPagina) : 0;

    const dataSql = `
        ${SQL_SELECT}
        ${SQL_BASE_FROM}
        ${whereSql}
        ${orderBy}
        LIMIT ? OFFSET ?
    `;

    const dataParams = [
        ...whereParams,
        ...orderParams,
        filtros.porPagina,
        filtros.offset,
    ];

    const [rows] = await db.query(dataSql, dataParams);

    return {
        articulos: rows.map(mapArticuloExplorar),
        paginacion: {
            pagina: filtros.pagina,
            por_pagina: filtros.porPagina,
            total,
            total_paginas: totalPaginas,
        },
        filtros_aplicados: {
            q: filtros.q || null,
            categorias_id: filtros.categoriasId.length ? filtros.categoriasId : null,
            precio_min: filtros.precioMin,
            precio_max: filtros.precioMax,
            estado_conservacion: filtros.estadosConservacion.length
                ? filtros.estadosConservacion
                : null,
            ubicacion: filtros.ubicacion || null,
            ordenar: filtros.ordenar,
        },
    };
};

module.exports = {
    getArticulosExplorar,
    normalizarFiltros,
};
