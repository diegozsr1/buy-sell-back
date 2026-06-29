const db = require('../config/db.js');
const { getProvinciaFromCp } = require('../utils/codigoPostal.utils.js');

const getAll = async () => {
    const [rows] = await db.query('SELECT * FROM favoritos');
    return rows;
};

const getAllByUser = async (user_id) => {
    const [rows] = await db.query(`
        SELECT 
            f.id AS favoritos_id,
            a.*,
            (SELECT COUNT(*) 
            FROM favoritos 
            WHERE usuarios_id = ?) AS total,
            u.nombre as nombre_vendedor,
            u.apellidos as apellidos_vendedor,
            u.cp,
            v.cantidad as cantidad_valoraciones,
            v.valoracion as puntuacion,
            fo.url_foto
        FROM favoritos f 
        LEFT JOIN articulos a ON a.id = f.articulos_id 
        LEFT JOIN (SELECT a.usuarios_id,count(a.usuarios_id)as cantidad,avg(v.puntuacion) as valoracion 
			FROM valoraciones v 
			LEFT JOIN articulos a ON a.id=v.articulos_id 
			GROUP BY a.usuarios_id 
            ) v ON a.usuarios_id=v.usuarios_id 
        LEFT JOIN usuarios u ON u.id=a.usuarios_id 
        LEFT JOIN articulo_fotos fo ON (a.id=fo.articulos_id AND fo.principal=1)
        WHERE f.usuarios_id = ? AND a.estado_articulo_id != 'Retirado' 
        `,[user_id,user_id]);

    const articulos = rows.map((row) => ({
            ...row,
            provincia: getProvinciaFromCp(row.cp),
        }));
    
        return {
            articulos,
        };
};

const getAllFavoriteUsersByUser = async (user_id) => {
    const [rows] = await db.query(`
        SELECT uf.*,u.nombre,u.apellidos,v.cantidad,v.valoracion
            FROM usuarios_favoritos uf
            LEFT JOIN usuarios u ON uf.usuario_favorito_id=u.id
            LEFT JOIN (SELECT a.usuarios_id,count(a.usuarios_id)as cantidad,avg(v.puntuacion) as valoracion 
                    FROM valoraciones v 
                    LEFT JOIN articulos a ON a.id=v.articulos_id 
                    GROUP BY a.usuarios_id 
                    ) v ON uf.usuario_favorito_id=v.usuarios_id
            WHERE uf.usuarios_id=?
        `,[user_id]);
    
        return rows;
};

const getById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM favoritos WHERE id = ?',
        [id]
    );
    return rows[0];
};

const create = async (data) => {
    const { usuarios_id, articulos_id } = data;

    const [result] = await db.query(
        `INSERT INTO favoritos
        (usuarios_id, articulos_id)
        VALUES (?, ?)`,
        [usuarios_id, articulos_id]
    );

    return { id: result.insertId };
};

const update = async (id, data) => {
    const { usuarios_id, articulos_id } = data;

    const [result] = await db.query(
        `UPDATE favoritos
         SET usuarios_id = ?,
             articulos_id = ?
         WHERE id = ?`,
        [usuarios_id, articulos_id, id]
    );

    return result.affectedRows > 0;
};

const deleteById = async (id) => {
    const [result] = await db.query(
        'DELETE FROM favoritos WHERE id = ?',
        [id]
    );

    return result.affectedRows > 0;
};

module.exports = {
    getAll,
    getAllByUser,
    getAllFavoriteUsersByUser,
    getById,
    create,
    update,
    deleteById,
};
