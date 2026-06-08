const db = require('../config/db.js');

const getByUsername = async (username) => {
    const result = await db.query(
        `SELECT * FROM usuarios WHERE username = ?`,
        [username]
    );
    return result[0][0] ?? null;
};

module.exports = {
    getByUsername
};
