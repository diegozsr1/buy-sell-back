const db = require('../config/db.js');

const getByEmail = async (email) => {
    const result = await db.query(
        `SELECT * FROM usuarios WHERE email = ? AND estado = 1`,
        [email]
    );
    const usuario = result[0][0] ?? null;
    if (!usuario) return null;
    if (usuario.bloqueado === 1) {
        return { blocked: true, error: 'Usuario bloqueado' };
    }
    return usuario;
};

module.exports = {
    getByEmail
};
