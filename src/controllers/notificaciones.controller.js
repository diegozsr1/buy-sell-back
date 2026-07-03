const db = require('../config/db');

// 1. Trae TODAS las notificaciones (leídas y no leídas) para que siempre se vean en la pantalla
exports.obtenerNotificaciones = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const [rows] = await db.query(
            'SELECT * FROM notificaciones WHERE usuarios_id = ? ORDER BY created_at DESC', 
            [usuarioId]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 2. Cuenta ÚNICAMENTE las que están sin leer (leida = 0) para la campana
exports.contarSinLeer = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const [rows] = await db.query(
            'SELECT COUNT(*) AS total FROM notificaciones WHERE usuarios_id = ? AND leida = 0', 
            [usuarioId]
        );
        const totalSinLeer = rows[0] ? rows[0].total : 0;
        res.json({ sinLeer: totalSinLeer });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 3. Marca como leídas (cambia a 1)
exports.marcarComoLeidas = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        await db.query(
            'UPDATE notificaciones SET leida = 1 WHERE usuarios_id = ? AND leida = 0', 
            [usuarioId]
        );
        res.json({ message: 'Notificaciones marcadas como leídas' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
