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
    const result = await db.query(`SELECT * FROM usuarios`);
    return result[0].map(omitPassword);
};

const getById = async (id) => {
    const result = await db.query(`SELECT * FROM usuarios WHERE id = ?`, [id]);
    return omitPassword(result[0][0]);
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
        `INSERT INTO usuarios (nombre, apellidos, username, email, password, foto, roles_id, direccion, \`zona_geográfica\`, cp, bloqueado, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
         WHERE id = ?`,
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

const remove = async (id) => {
    const result = await db.query(`DELETE FROM usuarios WHERE id = ?`, [id]);
    return result[0].affectedRows > 0;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
