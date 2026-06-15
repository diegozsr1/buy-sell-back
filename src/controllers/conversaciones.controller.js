const ConversacionModel = require('../models/conversaciones.model.js');

// GET /conversaciones
const getConversaciones = async (req, res) => {
    try {
        const rows = await ConversacionModel.getAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener las conversaciones',
            error: error.message,
        });
    }
};

// GET /conversaciones/:id
const getConversacionById = async (req, res) => {
    try {
        const { id } = req.params;
        const conversacion = await ConversacionModel.getById(id);

        if (!conversacion) {
            return res.status(404).json({
                mensaje: 'Conversación no encontrada',
            });
        }

        res.status(200).json(conversacion);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener la conversación',
            error: error.message,
        });
    }
};

// POST /conversaciones
const createConversacion = async (req, res) => {
    try {
        const { comprador_id, articulos_id } = req.body;

        if (!comprador_id || !articulos_id) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios',
            });
        }

        const resultado = await ConversacionModel.create({
            comprador_id,
            articulos_id,
        });

        res.status(201).json({
            mensaje: 'Conversación creada correctamente',
            id: resultado.id,
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear la conversación',
            error: error.message,
        });
    }
};

// PUT /conversaciones/:id
const updateConversacion = async (req, res) => {
    try {
        const { id } = req.params;
        const conversacionExistente = await ConversacionModel.getById(id);

        if (!conversacionExistente) {
            return res.status(404).json({
                mensaje: 'Conversación no encontrada',
            });
        }

        const { comprador_id, articulos_id } = req.body;

        if (!comprador_id || !articulos_id) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios',
            });
        }

        await ConversacionModel.update(id, { comprador_id, articulos_id });

        res.status(200).json({
            mensaje: 'Conversación actualizada correctamente',
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar la conversación',
            error: error.message,
        });
    }
};

// DELETE /conversaciones/:id
const deleteConversacion = async (req, res) => {
    try {
        const { id } = req.params;
        const conversacionExistente = await ConversacionModel.getById(id);

        if (!conversacionExistente) {
            return res.status(404).json({
                mensaje: 'Conversación no encontrada',
            });
        }

        await ConversacionModel.deleteById(id);

        res.status(200).json({
            mensaje: 'Conversación eliminada correctamente',
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar la conversación',
            error: error.message,
        });
    }
};

module.exports = {
    getConversaciones,
    getConversacionById,
    createConversacion,
    updateConversacion,
    deleteConversacion,
};
