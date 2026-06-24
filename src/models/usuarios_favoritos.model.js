const db = require('../config/db.js');

const getByUser = async (user_id) => {
    const [rows] = await db.query(
        `SELECT
            uf.id,
            uf.usuarios_id,
            uf.usuario_favorito_id,
            uf.created_at,
            u.nombre,
            u.apellidos,
            u.username,
            u.foto,
            v.cantidad AS cantidad_valoraciones,
            v.valoracion AS puntuacion
        FROM usuarios_favoritos uf
        INNER JOIN usuarios u ON u.id = uf.usuario_favorito_id
        LEFT JOIN (
            SELECT
                a.usuarios_id,
                COUNT(a.usuarios_id) AS cantidad,
                AVG(v.puntuacion) AS valoracion
            FROM valoraciones v
            INNER JOIN articulos a ON a.id = v.articulos_id
            GROUP BY a.usuarios_id
        ) v ON u.id = v.usuarios_id
        WHERE uf.usuarios_id = ?
        ORDER BY uf.created_at DESC`,
        [user_id]
    );

    return rows.map((row) => ({
        ...row,
        puntuacion: row.puntuacion !== null ? Number(row.puntuacion) : null,
        cantidad_valoraciones: row.cantidad_valoraciones !== null
            ? Number(row.cantidad_valoraciones)
            : 0,
    }));
};

const getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM usuarios_favoritos WHERE id = ?',
        [id]
    );
    return rows[0];
};

const create = async (data) => {
    const { usuarios_id, usuario_favorito_id } = data;

    const [result] = await db.query(
        `INSERT INTO usuarios_favoritos
        (usuarios_id, usuario_favorito_id)
        VALUES (?, ?)`,
        [usuarios_id, usuario_favorito_id]
    );

    return { id: result.insertId };
};

const deleteById = async (id) => {
    const [result] = await db.query(
        'DELETE FROM usuarios_favoritos WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
};

module.exports = {
    getByUser,
    getById,
    create,
    deleteById,
};
