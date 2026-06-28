const db = require('../config/db.js');

const getByEmail = async (email) => {
    const result = await db.query(
        `SELECT * FROM usuarios WHERE email = ? AND estado = 1`,
        [email]
    );
    return result[0][0] ?? null;
};

module.exports = {
    getByEmail
};
