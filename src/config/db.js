//import mysql from 'mysql2/promise';
const mysql = require('mysql2/promise');

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST, // o la IP del servidor
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME_DB
});

module.exports = pool;