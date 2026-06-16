const db = require('../config/db.js');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM categorias');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM categorias WHERE id = ?',
        [id]
    );
    return rows[0];
};

const create = async (data) => {
    const { nombre, descripcion, icono } = data;

    const [result] = await db.query(
        `INSERT INTO categorias (nombre, descripcion, icono)
         VALUES (?, ?, ?)`,
        [nombre, descripcion, icono ?? null]
    );

    return { id: result.insertId };
};

const update = async (id, data) => {
    const { nombre, descripcion, icono } = data;

    const [result] = await db.query(
        `UPDATE categorias
         SET nombre = ?, descripcion = ?, icono = ?
         WHERE id = ?`,
        [nombre, descripcion, icono ?? null, id]
    );

    return result.affectedRows > 0;
};

const deleteById = async (id) => {
    const [result] = await db.query(
        'DELETE FROM categorias WHERE id = ?',
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
