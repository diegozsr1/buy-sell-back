const db = require('../config/db.js');

const mapValoracion = (row) => {
    if (!row) return row;

    return {
        ...row,
        puntuacion: Number(row.puntuacion),
    };
};

const getPromedioRecibidasByUsuarioId = async (usuarioId) => {
    const result = await db.query(
        `SELECT AVG(v.puntuacion) AS puntuacion_media,
                COUNT(v.id) AS total_valoraciones
         FROM valoraciones v
         INNER JOIN articulos a ON a.id = v.articulos_id
         WHERE a.usuarios_id = ?`,
        [usuarioId]
    );

    const row = result[0][0];

    return {
        usuario_id: usuarioId,
        puntuacion_media: row.puntuacion_media !== null ? Number(row.puntuacion_media) : null,
        total_valoraciones: Number(row.total_valoraciones),
    };
};

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM valoraciones ORDER BY creada_en DESC');
    return rows.map(mapValoracion);
};

const getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM valoraciones WHERE id = ?',
        [id]
    );

    return mapValoracion(rows[0]);
};

const create = async (data) => {
    const { usuario_valorador_id, articulos_id, puntuacion, mensaje } = data;

    const [result] = await db.query(
        `INSERT INTO valoraciones
        (usuario_valorador_id, articulos_id, puntuacion, mensaje)
        VALUES (?, ?, ?, ?)`,
        [usuario_valorador_id, articulos_id, puntuacion, mensaje]
    );

    return { id: result.insertId };
};

const update = async (id, data) => {
    const { usuario_valorador_id, articulos_id, puntuacion, mensaje } = data;

    const [result] = await db.query(
        `UPDATE valoraciones
         SET usuario_valorador_id = ?,
             articulos_id = ?,
             puntuacion = ?,
             mensaje = ?
         WHERE id = ?`,
        [usuario_valorador_id, articulos_id, puntuacion, mensaje, id]
    );

    return result.affectedRows > 0;
};

const deleteById = async (id) => {
    const [result] = await db.query(
        'DELETE FROM valoraciones WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
};

module.exports = {
    getPromedioRecibidasByUsuarioId,
    getAll,
    getById,
    create,
    update,
    deleteById,
};
