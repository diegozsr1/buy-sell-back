const db=require('../config/db.js');
//import mysql from 'mysql2/promise';

const getAll = async () => {
    const result = await db.query(`SELECT * FROM categories`);
    return result[0];
}


module.exports={
    getAll
}