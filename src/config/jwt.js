const jwt = require('jsonwebtoken');

require('dotenv').config();

const signToken = (payload) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET no está configurado');
    }

    return jwt.sign(payload, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });
};

module.exports = {
    signToken
};
