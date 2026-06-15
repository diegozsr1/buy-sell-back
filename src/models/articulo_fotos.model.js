const db = require('../config/db.js');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM articulo_fotos');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM articulo_fotos WHERE id = ?',
        [id]
    );
    return rows[0];
};

const create = async (data) => {
    const { url_foto, principal, articulos_id } = data;

    const [result] = await db.query(
        `INSERT INTO articulo_fotos
        (url_foto, principal, articulos_id)
        VALUES (?, ?, ?)`,
        [url_foto, principal, articulos_id]
    );

    return { id: result.insertId };
};

const update = async (id, data) => {
    const { url_foto, principal, articulos_id } = data;

    const [result] = await db.query(
        `UPDATE articulo_fotos
         SET url_foto = ?, principal = ?, articulos_id = ?
         WHERE id = ?`,
        [url_foto, principal, articulos_id, id]
    );

    return result.affectedRows > 0;
};

const deleteById = async (id) => {
    const [result] = await db.query(
        'DELETE FROM articulo_fotos WHERE id = ?',
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
