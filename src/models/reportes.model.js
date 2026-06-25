const db = require('../config/db.js');

const getAll = async () => {
    const [rows] = await db.query(
        'SELECT * FROM reportes ORDER BY created_at DESC'
    );
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM reportes WHERE id = ?',
        [id]
    );
    return rows[0];
};

const create = async (data) => {
    const {
        usuario_reportado_id,
        usuario_reportante_id,
        articulos_id,
        moderador_id,
        motivo,
        descripcion,
        estado,
        resultado_reporte,
    } = data;

    const [result] = await db.query(
        `INSERT INTO reportes
        (usuario_reportado_id, usuario_reportante_id, articulos_id, moderador_id, motivo, descripcion, estado, resultado_reporte)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            usuario_reportado_id ?? null,
            usuario_reportante_id,
            articulos_id ?? null,
            moderador_id ?? null,
            motivo,
            descripcion,
            estado,
            resultado_reporte ?? null,
        ]
    );

    return { id: result.insertId };
};

const update = async (id, data) => {
    const {
        usuario_reportado_id,
        usuario_reportante_id,
        articulos_id,
        moderador_id,
        motivo,
        descripcion,
        estado,
        resultado_reporte,
    } = data;

    const [result] = await db.query(
        `UPDATE reportes
         SET usuario_reportado_id = ?,
             usuario_reportante_id = ?,
             articulos_id = ?,
             moderador_id = ?,
             motivo = ?,
             descripcion = ?,
             estado = ?,
             resultado_reporte = ?,
             updated_at = NOW()
         WHERE id = ?`,
        [
            usuario_reportado_id ?? null,
            usuario_reportante_id,
            articulos_id ?? null,
            moderador_id,
            motivo,
            descripcion,
            estado,
            resultado_reporte ?? null,
            id,
        ]
    );

    return result.affectedRows > 0;
};

const deleteById = async (id) => {
    const [result] = await db.query(
        'DELETE FROM reportes WHERE id = ?',
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
