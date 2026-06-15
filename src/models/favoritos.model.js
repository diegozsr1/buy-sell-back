const db = require('../config/db.js');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM favoritos');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM favoritos WHERE id = ?',
        [id]
    );
    return rows[0];
};

const create = async (data) => {
    const { usuarios_id, articulos_id } = data;

    const [result] = await db.query(
        `INSERT INTO favoritos
        (usuarios_id, articulos_id)
        VALUES (?, ?)`,
        [usuarios_id, articulos_id]
    );

    return { id: result.insertId };
};

const update = async (id, data) => {
    const { usuarios_id, articulos_id } = data;

    const [result] = await db.query(
        `UPDATE favoritos
         SET usuarios_id = ?,
             articulos_id = ?
         WHERE id = ?`,
        [usuarios_id, articulos_id, id]
    );

    return result.affectedRows > 0;
};

const deleteById = async (id) => {
    const [result] = await db.query(
        'DELETE FROM favoritos WHERE id = ?',
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
