const db = require('../config/db.js');

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
        total_valoraciones: Number(row.total_valoraciones)
    };
};

const getAll = async () => {};

const getById = async (id) => {};

const create = async (data) => {};

const update = async (id, data) => {};

const deleteById = async (id) => {};

module.exports = {
    getPromedioRecibidasByUsuarioId,
    getAll,
    getById,
    create,
    update,
    deleteById,
};
