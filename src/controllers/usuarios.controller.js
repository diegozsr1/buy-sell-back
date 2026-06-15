const UsuarioModel = require('../models/usuarios.model.js');
const {
    usuarioSchema,
    usuarioIdSchema,
    usuarioRolSchema,
    usuarioBloqueadoSchema
} = require('../schemas/usuarios.schema.js');

const validationOptions = { abortEarly: false, stripUnknown: true };

const handleValidationError = (error, res) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            detalles: error.errors
        });
    }
    return null;
};

const getUsuarios = async (req, res) => {
    try {
        const resultado = await UsuarioModel.getAll();

        if (resultado) {
            res.json(resultado);
        } else {
            return res.status(500).json({ error: 'Ha habido un error al consultar la base de datos' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const countUsuarios = async (req, res) => {
    try {
        const total = await UsuarioModel.countAll();
        res.json({ count: total });
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const countUsuariosByRol = async (req, res) => {
    try {
        const { rol } = await usuarioRolSchema.validate(req.params, validationOptions);
        const total = await UsuarioModel.countByRol(rol);
        res.json({ count: total });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const countUsuariosByBloqueado = async (req, res) => {
    try {
        const { bloqueado } = await usuarioBloqueadoSchema.validate(req.params, validationOptions);
        const total = await UsuarioModel.countByBloqueado(bloqueado);
        res.json({ count: total });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const { id } = await usuarioIdSchema.validate(req.params, validationOptions);
        const resultado = await UsuarioModel.getById(id);

        if (resultado) {
            res.json(resultado);
        } else {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const createUsuario = async (req, res) => {
    try {
        const datosValidados = await usuarioSchema.validate(req.body, validationOptions);
        const resultado = await UsuarioModel.create(datosValidados);
        res.status(201).json(resultado);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al crear el usuario: ' + error.message });
    }
};

const updateUsuario = async (req, res) => {
    try {
        const { id } = await usuarioIdSchema.validate(req.params, validationOptions);
        const datosValidados = await usuarioSchema.validate(req.body, validationOptions);
        const actualizado = await UsuarioModel.update(id, datosValidados);

        if (actualizado) {
            const resultado = await UsuarioModel.getById(id);
            res.json(resultado);
        } else {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al actualizar el usuario' });
    }
};

const updateUsuarioRol = async (req, res) => {
    try {
        const { id } = await usuarioIdSchema.validate(req.params, validationOptions);
        const { rol } = await usuarioRolSchema.validate(req.params, validationOptions);
        const actualizado = await UsuarioModel.updateRol(id, rol);

        if (actualizado) {
            const resultado = await UsuarioModel.getById(id);
            res.json(resultado);
        } else {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al actualizar el rol del usuario' });
    }
};

const updateUsuarioBloqueado = async (req, res) => {
    try {
        const { id } = await usuarioIdSchema.validate(req.params, validationOptions);
        const { bloqueado } = await usuarioBloqueadoSchema.validate(req.params, validationOptions);
        const actualizado = await UsuarioModel.updateBloqueado(id, bloqueado);

        if (actualizado) {
            const resultado = await UsuarioModel.getById(id);
            res.json(resultado);
        } else {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al actualizar el estado de bloqueo del usuario' });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const { id } = await usuarioIdSchema.validate(req.params, validationOptions);
        const eliminado = await UsuarioModel.remove(id);

        if (eliminado) {
            res.json({ message: 'Usuario eliminado correctamente' });
        } else {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al eliminar el usuario' });
    }
};

module.exports = {
    getUsuarios,
    countUsuarios,
    countUsuariosByRol,
    countUsuariosByBloqueado,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    updateUsuarioRol,
    updateUsuarioBloqueado,
    deleteUsuario
};
