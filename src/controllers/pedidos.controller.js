const PedidoModel = require('../models/pedidos.model.js');
const { pedidoIdSchema, pedidoSchema } = require('../schemas/pedidos.schema.js');

const validationOptions = { abortEarly: false, stripUnknown: true };

const handleValidationError = (error, res) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            detalles: error.errors,
        });
    }
    return null;
};

const getPedidos = async (req, res) => {
    try {
        const resultado = await PedidoModel.getAll();
        res.json(resultado);
    } catch (error) {
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const getPedidoById = async (req, res) => {
    try {
        const { id } = await pedidoIdSchema.validate(req.params, validationOptions);
        const resultado = await PedidoModel.getById(id);

        if (!resultado) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        res.json(resultado);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const createPedido = async (req, res) => {
    try {
        const datosValidados = await pedidoSchema.validate(req.body, validationOptions);
        const resultado = await PedidoModel.create(datosValidados);

        res.status(201).json({
            id: resultado.id,
            mensaje: 'Pedido creado correctamente',
        });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al crear el pedido' });
    }
};

const updatePedido = async (req, res) => {
    try {
        const { id } = await pedidoIdSchema.validate(req.params, validationOptions);
        const datosValidados = await pedidoSchema.validate(req.body, validationOptions);
        const actualizado = await PedidoModel.update(id, datosValidados);

        if (!actualizado) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        res.json({ mensaje: 'Pedido actualizado correctamente' });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al actualizar el pedido' });
    }
};

const deletePedido = async (req, res) => {
    try {
        const { id } = await pedidoIdSchema.validate(req.params, validationOptions);
        const eliminado = await PedidoModel.deleteById(id);

        if (!eliminado) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        res.json({ mensaje: 'Pedido eliminado correctamente' });
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al eliminar el pedido' });
    }
};

module.exports = {
    getPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
};
