const NotificacionModel = require('../models/notificaciones.model.js');
const PedidoModel = require('../models/pedidos.model.js');
const ArticuloModel = require('../models/articulos.model.js');
const UsuarioModel = require('../models/usuarios.model.js');
const { sendEmail } = require('../services/email.service.js');
const {
    pedidoIdSchema,
    pedidoSchema,
    pedidoUsuarioIdSchema,
} = require('../schemas/pedidos.schema.js');

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

const getPedidoByIdTodosDatos = async (req, res) => {
    try {
        const { id } = await pedidoIdSchema.validate(req.params, validationOptions);
        const resultado = await PedidoModel.getAllDataById(id);

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
        const resultado = await PedidoModel.createWithConversacion(datosValidados);
        const articulo = await ArticuloModel.getById(datosValidados.articulos_id);
        console.log('ARTICULO:', articulo);
        await NotificacionModel.create({
        usuarios_id: articulo.usuarios_id, 
        articulos_id: datosValidados.articulos_id,
        tipo: 'venta',
        titulo: 'Nueva venta',
        mensaje: `Han comprado tu artículo`,
});

        try {
            const comprador = await UsuarioModel.getById(datosValidados.comprador_id);
            if (comprador?.email) {
                await sendEmail({
                    to: comprador.email,
                    subject: 'Confirmación de pedido - Buy&Sell',
                    body: `Tu pedido #${resultado.id} se ha registrado correctamente.`,
                    isHtml: false,
                });
            }
        } catch (emailError) {
            console.error('Error al enviar correo del pedido:', emailError);
        }

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

const getVentasByUsuario = async (req, res) => {
    try {
        const { usuarioId } = await pedidoUsuarioIdSchema.validate(req.params, validationOptions);
        const resultado = await PedidoModel.getVentasByUsuarioId(usuarioId);
        res.json(resultado);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

const getPedidosByUsuario = async (req, res) => {
    try {
        const { usuarioId } = await pedidoUsuarioIdSchema.validate(req.params, validationOptions);
        const resultado = await PedidoModel.getByCompradorId(usuarioId);
        res.json(resultado);
    } catch (error) {
        const validationResponse = handleValidationError(error, res);
        if (validationResponse) return validationResponse;
        return res.status(500).json({ error: 'Ha habido un error al consultar los datos' });
    }
};

module.exports = {
    getPedidos,
    getPedidoById,
    getPedidoByIdTodosDatos,
    getVentasByUsuario,
    getPedidosByUsuario,
    createPedido,
    updatePedido,
    deletePedido,
};
