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

const getRecientes = async () => {
    const [rows] = await db.query(
        `SELECT * FROM articulos
         WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
         ORDER BY created_at DESC`
    );
    return rows;
};

const getMasVendidos = async (limite = 10) => {
    const [rows] = await db.query(
        `SELECT a.*, COUNT(p.id) AS total_ventas
         FROM articulos a
         INNER JOIN pedidos p ON p.articulos_id = a.id AND p.estado = 'Completado'
         GROUP BY a.id
         ORDER BY total_ventas DESC
         LIMIT ?`,
        [limite]
    );

    return rows.map((row) => ({
        ...row,
        total_ventas: Number(row.total_ventas),
        precio: Number(row.precio),
    }));
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
    getRecientes,
    getMasVendidos,
    create,
    update,
    deleteById,
    countPublicadosByUsuarioId,
};
