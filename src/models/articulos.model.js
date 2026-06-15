const db = require('../config/db.js');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM articulos');
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM articulos WHERE id = ?',
        [id]
    );
    return rows[0];
};

const create = async (data) => {
    const {
        usuarios_id,
        titulo,
        descripcion,
        categorias_id,
        precio,
        estado_conservacion_id,
        estado_articulo_id,
    } = data;

    const [result] = await db.query(
        `INSERT INTO articulos
        (
            usuarios_id,
            titulo,
            descripcion,
            categorias_id,
            precio,
            estado_conservacion_id,
            estado_articulo_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            usuarios_id,
            titulo,
            descripcion,
            categorias_id,
            precio,
            estado_conservacion_id,
            estado_articulo_id,
        ]
    );

    return { id: result.insertId };
};

const update = async (id, data) => {
    const {
        usuarios_id,
        titulo,
        descripcion,
        categorias_id,
        precio,
        estado_conservacion_id,
        estado_articulo_id,
    } = data;

    const [result] = await db.query(
        `UPDATE articulos
         SET
            usuarios_id = ?,
            titulo = ?,
            descripcion = ?,
            categorias_id = ?,
            precio = ?,
            estado_conservacion_id = ?,
            estado_articulo_id = ?,
            updated_at = NOW()
         WHERE id = ?`,
        [
            usuarios_id,
            titulo,
            descripcion,
            categorias_id,
            precio,
            estado_conservacion_id,
            estado_articulo_id,
            id,
        ]
    );

    return result.affectedRows > 0;
};

const deleteById = async (id) => {
    const [result] = await db.query(
        'DELETE FROM articulos WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
};

const countPublicadosByUsuarioId = async (usuarioId) => {
    const [rows] = await db.query(
        `SELECT COUNT(*) AS total
         FROM articulos
         WHERE usuarios_id = ? AND estado_articulo_id = 'Publicado'`,
        [usuarioId]
    );

    return {
        usuario_id: usuarioId,
        total_publicados: Number(rows[0].total),
    };
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    countPublicadosByUsuarioId,
};
