const db = require('../config/db.js');

const create = async (data) => {
    const { usuarios_id, articulos_id, tipo, titulo, mensaje } = data;

    const [result] = await db.query(
        `INSERT INTO notificaciones 
        (usuarios_id, articulos_id, tipo, titulo, mensaje, leida)
        VALUES (?, ?, ?, ?, ?, 0)`,
        [usuarios_id, articulos_id, tipo, titulo, mensaje]
    );

    return { id: result.insertId };
};

module.exports = {
    create,
};