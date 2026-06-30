const db = require('../config/db.js');

const getByConversacionId = async (conversacionId) => {
    const [rows] = await db.query(
        `SELECT id,
                conversaciones_id,
                emisor_id,
                receptor_id,
                mensaje,
                leido,
                enviado_en
         FROM mensajes
         WHERE conversaciones_id = ?
         ORDER BY enviado_en ASC, id ASC`,
        [conversacionId]
    );
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM mensajes WHERE id = ?',
        [id]
    );
    return rows[0];
};

const create = async (data) => {
    const { conversaciones_id, emisor_id, receptor_id, mensaje } = data;

    const [result] = await db.query(
        `INSERT INTO mensajes
        (conversaciones_id, emisor_id, receptor_id, mensaje, leido)
        VALUES (?, ?, ?, ?, 0)`,
        [conversaciones_id, emisor_id, receptor_id, mensaje]
    );

    return { id: result.insertId };
};

const markAsReadByConversacion = async (conversacionId, usuarioId) => {
    const [result] = await db.query(
        `UPDATE mensajes
         SET leido = 1
         WHERE conversaciones_id = ?
           AND emisor_id != ?
           AND leido = 0`,
        [conversacionId, usuarioId]
    );
    return result.affectedRows;
};

const getUnreadCountByUsuario = async (usuarioId) => {
    const [rows] = await db.query(
        `SELECT COUNT(*) AS total
         FROM mensajes m
         INNER JOIN conversaciones c ON c.id = m.conversaciones_id
         INNER JOIN pedidos p ON p.id = c.pedidos_id
         INNER JOIN articulos a ON a.id = p.articulos_id
         WHERE m.leido = 0
           AND m.emisor_id != ?
           AND (p.comprador_id = ? OR a.usuarios_id = ?)`,
        [usuarioId, usuarioId, usuarioId]
    );
    return Number(rows[0].total);
};

module.exports = {
    getByConversacionId,
    getById,
    create,
    markAsReadByConversacion,
    getUnreadCountByUsuario,
};
