const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuarios.model.js');

const checkToken = async (req, res, next) => {
    // Cabecera de autorización
    const authHeader = req.headers.authorization;

    // Existe Token
    if (!authHeader) {
        return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
    }

    // Validación token
    const token = authHeader.split(' ')[1]; // Bearer <token>
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ error: 'Token de autenticación inválido' });
    }

    // Existe el usuario referido
    const user = await UsuarioModel.getById(decoded.id)
    if(!user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    req.usuario = user;

    console.log(req.usuario);
    
    next();
}

module.exports = {
    checkToken
};