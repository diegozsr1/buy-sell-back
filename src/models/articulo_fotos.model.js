const db = require('../config/db_config');

class ArticuloFotosModel {
    static async getByArticulo(articuloId) {
        const [rows] = await db.query('SELECT * FROM articulo_fotos WHERE articulos_id = ?', [articuloId]);
        return rows;
    }

    static async create(url_foto, principal, articulos_id) {
        const [result] = await db.query(
            'INSERT INTO articulo_fotos (url_foto, principal, articulos_id) VALUES (?, ?, ?)',
            [url_foto, principal, articulos_id]
        );
        return { id: result.insertId };
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM articulo_fotos WHERE id = ?', [id]);
        return result.affectedRows;
    }
}

module.exports = ArticuloFotosModel;
