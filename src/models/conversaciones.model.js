const db = require('../config/db.js');

const getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM conversaciones WHERE id = ?',
        [id]
    );
    return rows[0];
};

const getByPedidoId = async (pedidoId) => {
    const [rows] = await db.query(
        'SELECT * FROM conversaciones WHERE pedidos_id = ?',
        [pedidoId]
    );
    return rows[0];
};

const getParticipantesByConversacionId = async (conversacionId) => {
    const [rows] = await db.query(
        `SELECT p.id AS pedido_id,
                p.comprador_id,
                p.estado AS pedido_estado,
                a.id AS articulos_id,
                a.titulo AS articulo_titulo,
                a.usuarios_id AS vendedor_id
         FROM conversaciones c
         INNER JOIN pedidos p ON p.id = c.pedidos_id
         INNER JOIN articulos a ON a.id = p.articulos_id
         WHERE c.id = ?`,
        [conversacionId]
    );
    return rows[0];
};

const getParticipantesByPedidoId = async (pedidoId) => {
    const [rows] = await db.query(
        `SELECT p.id AS pedido_id,
                p.comprador_id,
                p.estado AS pedido_estado,
                a.id AS articulos_id,
                a.titulo AS articulo_titulo,
                a.usuarios_id AS vendedor_id
         FROM pedidos p
         INNER JOIN articulos a ON a.id = p.articulos_id
         WHERE p.id = ?`,
        [pedidoId]
    );
    return rows[0];
};

const getByUsuarioId = async (usuarioId) => {
    const [rows] = await db.query(
        `SELECT c.id,
                c.pedidos_id,
                c.created_at,
                c.updated_at,
                p.estado AS pedido_estado,
                p.comprador_id,
                a.id AS articulos_id,
                a.titulo AS articulo_titulo,
                a.usuarios_id AS vendedor_id,
                CASE
                    WHEN p.comprador_id = ? THEN a.usuarios_id
                    ELSE p.comprador_id
                END AS otro_usuario_id,
                (
                    SELECT COUNT(*)
                    FROM mensajes m
                    WHERE m.conversaciones_id = c.id
                      AND m.leido = 0
                      AND m.emisor_id != ?
                ) AS no_leidos,
                (
                    SELECT m.mensaje
                    FROM mensajes m
                    WHERE m.conversaciones_id = c.id
                    ORDER BY m.enviado_en DESC, m.id DESC
                    LIMIT 1
                ) AS ultimo_mensaje,
                (
                    SELECT m.enviado_en
                    FROM mensajes m
                    WHERE m.conversaciones_id = c.id
                    ORDER BY m.enviado_en DESC, m.id DESC
                    LIMIT 1
                ) AS ultimo_mensaje_en
         FROM conversaciones c
         INNER JOIN pedidos p ON p.id = c.pedidos_id
         INNER JOIN articulos a ON a.id = p.articulos_id
         WHERE p.comprador_id = ? OR a.usuarios_id = ?
         ORDER BY c.updated_at DESC`,
        [usuarioId, usuarioId, usuarioId, usuarioId]
    );

    if (rows.length === 0) return [];

    const otroUsuarioIds = [...new Set(rows.map((row) => row.otro_usuario_id))];
    const placeholders = otroUsuarioIds.map(() => '?').join(', ');
    const [usuarios] = await db.query(
        `SELECT id, nombre, apellidos, username
         FROM usuarios
         WHERE id IN (${placeholders})`,
        otroUsuarioIds
    );
    const usuariosMap = new Map(usuarios.map((u) => [u.id, u]));

    return rows.map((row) => {
        const otro = usuariosMap.get(row.otro_usuario_id);
        return {
            id: row.id,
            pedidos_id: row.pedidos_id,
            pedido_estado: row.pedido_estado,
            created_at: row.created_at,
            updated_at: row.updated_at,
            articulo: {
                id: row.articulos_id,
                titulo: row.articulo_titulo,
            },
            otro_usuario: otro
                ? {
                      id: otro.id,
                      nombre: otro.nombre,
                      apellidos: otro.apellidos,
                      username: otro.username,
                  }
                : null,
            ultimo_mensaje: row.ultimo_mensaje,
            ultimo_mensaje_en: row.ultimo_mensaje_en,
            no_leidos: Number(row.no_leidos),
        };
    });
};

const createByPedidoId = async (pedidoId) => {
    const [result] = await db.query(
        'INSERT INTO conversaciones (pedidos_id) VALUES (?)',
        [pedidoId]
    );
    return { id: result.insertId };
};

const touchUpdatedAt = async (id) => {
    await db.query(
        'UPDATE conversaciones SET updated_at = NOW() WHERE id = ?',
        [id]
    );
};

module.exports = {
    getById,
    getByPedidoId,
    getParticipantesByConversacionId,
    getParticipantesByPedidoId,
    getByUsuarioId,
    createByPedidoId,
    touchUpdatedAt,
};
