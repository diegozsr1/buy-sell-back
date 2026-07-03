const db = require('../config/db');

class ArticuloModel {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM articulos');
        return rows;
    }

    static async getAllByUser(userId) {
        const [rows] = await db.query('SELECT * FROM articulos WHERE usuarios_id = ?', [userId]);
        return rows;
    }

    static async getRecientes() {
        const [rows] = await db.query('SELECT * FROM articulos ORDER BY created_at DESC LIMIT 20');
        return rows;
    }

    static async getMasVendidos(limit = 10) {
        const [rows] = await db.query('SELECT * FROM articulos ORDER BY precio DESC LIMIT ?', [limit]);
        return rows;
    }

    static async getById(id) {
        const [articulos] = await db.query('SELECT * FROM articulos WHERE id = ?', [id]);
        const [fotos] = await db.query('SELECT * FROM articulo_fotos WHERE articulos_id = ?', [id]);
        return { articulos, fotos };
    }

    static async create(datos) {
        const { usuarios_id, titulo, descripcion, categories_id, precio, estado_conservacion_id, estado_articulo_id } = datos;
        const [result] = await db.query(
            'INSERT INTO articulos (usuarios_id, titulo, descripcion, categorias_id, precio, estado_conservacion_id, estado_articulo_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [usuarios_id, titulo, descripcion, categories_id, precio, estado_conservacion_id, estado_articulo_id]
        );
        return { id: result.insertId };
    }

    static async createWithFotos(datosArticulo, listaFotos) {
        const resultado = await this.create(datosArticulo);
        const fotosGuardadas = [];
        for (const foto of listaFotos) {
            const [resultFoto] = await db.query(
                'INSERT INTO articulo_fotos (url_foto, principal, articulos_id) VALUES (?, ?, ?)',
                [foto.url_foto, foto.principal, resultado.id]
            );
            fotosGuardadas.push({ id: resultFoto.insertId });
        }
        return { id: resultado.id, fotos: fotosGuardadas };
    }
}

module.exports = ArticuloModel;
