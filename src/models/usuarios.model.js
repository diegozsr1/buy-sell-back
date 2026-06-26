const db = require('../config/db.js');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const omitPassword = (usuario) => {
    if (!usuario) return usuario;
    const { password, ...rest } = usuario;
    return rest;
};

const hashPassword = async (password) => bcrypt.hash(password, SALT_ROUNDS);

const getAll = async () => {
    const result = await db.query(`SELECT * FROM usuarios WHERE estado = 1`);
    return result[0].map(omitPassword);
};

const getById = async (id) => {
    const result = await db.query(`SELECT * FROM usuarios WHERE id = ? AND estado = 1`, [id]);
    return omitPassword(result[0][0]);
};

const countAll = async () => {
    const result = await db.query(`SELECT COUNT(*) AS total FROM usuarios WHERE estado = 1`);
    return result[0][0].total;
};

const countByRol = async (rol) => {
    const result = await db.query(
        `SELECT COUNT(*) AS total FROM usuarios WHERE roles_id = ? AND estado = 1`,
        [rol]
    );
    return result[0][0].total;
};

const countByBloqueado = async (bloqueado) => {
    const result = await db.query(
        `SELECT COUNT(*) AS total FROM usuarios WHERE bloqueado = ? AND estado = 1`,
        [bloqueado]
    );
    return result[0][0].total;
};

const create = async (usuario) => {
    const {
        nombre,
        apellidos,
        username,
        email,
        password,
        foto,
        roles_id,
        direccion,
        zona_geografica,
        cp,
        bloqueado
    } = usuario;

    const hashedPassword = await hashPassword(password);

    const result = await db.query(
        `INSERT INTO usuarios (nombre, apellidos, username, email, password, foto, roles_id, direccion, \`zona_geográfica\`, cp, bloqueado, estado, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            nombre,
            apellidos,
            username,
            email,
            hashedPassword,
            foto ?? null,
            roles_id ?? 'Usuario',
            direccion ?? null,
            zona_geografica ?? null,
            cp ?? null,
            bloqueado ?? 0,
            1,
            new Date()
        ]
    );

    return { id: result[0].insertId, ...omitPassword(usuario) };
};

const update = async (id, usuario) => {
    const {
        nombre,
        apellidos,
        username,
        email,
        password,
        foto,
        roles_id,
        direccion,
        zona_geografica,
        cp,
        bloqueado
    } = usuario;

    const hashedPassword = await hashPassword(password);

    const result = await db.query(
        `UPDATE usuarios SET
            nombre = ?,
            apellidos = ?,
            username = ?,
            email = ?,
            password = ?,
            foto = ?,
            roles_id = ?,
            direccion = ?,
            \`zona_geográfica\` = ?,
            cp = ?,
            bloqueado = ?
         WHERE id = ? AND estado = 1`,
        [
            nombre,
            apellidos,
            username,
            email,
            hashedPassword,
            foto ?? null,
            roles_id,
            direccion ?? null,
            zona_geografica ?? null,
            cp ?? null,
            bloqueado ?? 0,
            id
        ]
    );

    return result[0].affectedRows > 0;
};

const updateRol = async (id, roles_id) => {
    const result = await db.query(
        `UPDATE usuarios SET roles_id = ? WHERE id = ? AND estado = 1`,
        [roles_id, id]
    );
    return result[0].affectedRows > 0;
};

const updateBloqueado = async (id, bloqueado) => {
    const result = await db.query(
        `UPDATE usuarios SET bloqueado = ? WHERE id = ? AND estado = 1`,
        [bloqueado, id]
    );
    return result[0].affectedRows > 0;
};

const updateCP = async (id,cp) => {
    const result = await db.query(
        `UPDATE usuarios SET cp = ? WHERE id = ? AND estado = 1`,
        [cp, id]
    );
    return result[0].affectedRows > 0;
};

const remove = async (id) => {
    const result = await db.query(
        `UPDATE usuarios SET estado = 0 WHERE id = ? AND estado = 1`,
        [id]
    );
    return result[0].affectedRows > 0;
};

module.exports = {
    getAll,
    getById,
    countAll,
    countByRol,
    countByBloqueado,
    create,
    update,
    updateRol,
    updateBloqueado,
    updateCP,
    remove
};
