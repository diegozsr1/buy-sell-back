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

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
};
