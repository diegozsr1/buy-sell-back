const db = require('../config/db.js');

const getAll = async () => {
    const [rows] = await db.query(
        `SELECT c.*, COUNT(a.id) AS total_articulos
         FROM categorias c
         LEFT JOIN articulos a ON a.categorias_id = c.id
         WHERE c.estado = 1
         GROUP BY c.id
         ORDER BY c.nombre`
    );

    return rows.map((row) => ({
        ...row,
        total_articulos: Number(row.total_articulos),
    }));
};

const getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM categorias WHERE id = ? AND estado = 1',
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
         WHERE id = ? AND estado = 1`,
        [nombre, descripcion, icono ?? null, id]
    );

    return result.affectedRows > 0;
};

const deleteById = async (id) => {
    const [result] = await db.query(
        'UPDATE categorias SET estado = 0 WHERE id = ? AND estado = 1',
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
