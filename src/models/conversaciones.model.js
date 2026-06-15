const db = require('../config/db.js');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM conversaciones');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM conversaciones WHERE id = ?',
        [id]
    );
    return rows[0];
};

const create = async (data) => {
    const { comprador_id, articulos_id } = data;

    const [result] = await db.query(
        `INSERT INTO conversaciones
        (comprador_id, articulos_id)
        VALUES (?, ?)`,
        [comprador_id, articulos_id]
    );

    return { id: result.insertId };
};

const update = async (id, data) => {
    const { comprador_id, articulos_id } = data;

    const [result] = await db.query(
        `UPDATE conversaciones
         SET comprador_id = ?,
             articulos_id = ?,
             updated_at = NOW()
         WHERE id = ?`,
        [comprador_id, articulos_id, id]
    );

    return result.affectedRows > 0;
};

const deleteById = async (id) => {
    const [result] = await db.query(
        'DELETE FROM conversaciones WHERE id = ?',
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
