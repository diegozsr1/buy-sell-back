const db = require('../config/db.js');

const getAll = async () => {
    const [rows] = await db.query(
        'SELECT * FROM pedidos ORDER BY fecha_pedido DESC'
    );
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM pedidos WHERE id = ?',
        [id]
    );
    return rows[0];
};

const getByCompradorId = async (usuarioId) => {
    const [rows] = await db.query(
        `SELECT p.*,
                a.titulo AS nombre_articulo,
                af.id AS foto_id,
                af.url_foto,
                af.principal
         FROM pedidos p
         INNER JOIN articulos a ON a.id = p.articulos_id
         LEFT JOIN articulo_fotos af ON af.articulos_id = a.id
         WHERE p.comprador_id = ?
         ORDER BY p.fecha_pedido DESC, af.principal DESC, af.id ASC`,
        [usuarioId]
    );

    const pedidosMap = new Map();

    rows.forEach((row) => {
        if (!pedidosMap.has(row.id)) {
            pedidosMap.set(row.id, {
                id: row.id,
                comprador_id: row.comprador_id,
                articulos_id: row.articulos_id,
                fecha_pedido: row.fecha_pedido,
                estado: row.estado,
                direccion_envio: row.direccion_envio,
                created_at: row.created_at,
                updated_at: row.updated_at,
                nombre_articulo: row.nombre_articulo,
                fotos: [],
            });
        }

        pedidosMap.get(row.id).fotos.push({
            id: row.foto_id,
            url_foto: row.url_foto,
            principal: row.principal,
            articulos_id: row.articulos_id,
        });
    });

    return Array.from(pedidosMap.values());
};

const create = async (data) => {
    const { comprador_id, articulos_id, estado, direccion_envio } = data;

    const [result] = await db.query(
        `INSERT INTO pedidos
        (comprador_id, articulos_id, estado, direccion_envio)
        VALUES (?, ?, ?, ?)`,
        [comprador_id, articulos_id, estado, direccion_envio]
    );

    return { id: result.insertId };
};

const update = async (id, data) => {
    const { comprador_id, articulos_id, estado, direccion_envio } = data;

    const [result] = await db.query(
        `UPDATE pedidos
         SET comprador_id = ?,
             articulos_id = ?,
             estado = ?,
             direccion_envio = ?,
             updated_at = NOW()
         WHERE id = ?`,
        [comprador_id, articulos_id, estado, direccion_envio, id]
    );

    return result.affectedRows > 0;
};

const deleteById = async (id) => {
    const [result] = await db.query(
        'DELETE FROM pedidos WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
};

const getVentasByUsuarioId = async (usuarioId) => {
    const [rows] = await db.query(
        `SELECT COUNT(p.id) AS total_ventas,
                COALESCE(SUM(a.precio), 0) AS importe_total
         FROM pedidos p
         INNER JOIN articulos a ON a.id = p.articulos_id
         WHERE a.usuarios_id = ? AND p.estado = 'Completado'`,
        [usuarioId]
    );

    return {
        usuario_id: usuarioId,
        total_ventas: Number(rows[0].total_ventas),
        importe_total: Number(rows[0].importe_total),
    };
};

module.exports = {
    getAll,
    getById,
    getByCompradorId,
    create,
    update,
    deleteById,
    getVentasByUsuarioId,
};
