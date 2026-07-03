const db = require('../config/db.js');
const { notificacionCreateSchema } = require('../schemas/notificaciones.schema.js');

const validationOptions = { abortEarly: false, stripUnknown: true };

const getByUsuarioId = async (usuarioId) => {
    const [rows] = await db.query(
        'SELECT * FROM notificaciones WHERE usuarios_id = ? ORDER BY created_at DESC',
        [usuarioId]
    );
    return rows;
};

const countSinLeerByUsuarioId = async (usuarioId) => {
    const [rows] = await db.query(
        'SELECT COUNT(*) AS total FROM notificaciones WHERE usuarios_id = ? AND leida = 0',
        [usuarioId]
    );
    return rows[0] ? rows[0].total : 0;
};

const marcarComoLeidasByUsuarioId = async (usuarioId) => {
    const [result] = await db.query(
        'UPDATE notificaciones SET leida = 1 WHERE usuarios_id = ? AND leida = 0',
        [usuarioId]
    );
    return result.affectedRows;
};

const create = async (data) => {
    const { usuarios_id, articulos_id, tipo, titulo, mensaje } =
        await notificacionCreateSchema.validate(data, validationOptions);

    const [result] = await db.query(
        `INSERT INTO notificaciones
        (usuarios_id, articulos_id, tipo, titulo, mensaje, leida)
        VALUES (?, ?, ?, ?, ?, 0)`,
        [usuarios_id, articulos_id, tipo, titulo, mensaje]
    );

    return { id: result.insertId };
};

module.exports = {
    getByUsuarioId,
    countSinLeerByUsuarioId,
    marcarComoLeidasByUsuarioId,
    create,
};
