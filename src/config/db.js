//import mysql from 'mysql2/promise';
const mysql = require('mysql2/promise');

require('dotenv').config();

const fs = require('fs');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME_DB,
    ssl: {
        ca: fs.readFileSync(__dirname + '/ca.pem'),
        rejectUnauthorized: true
    }
});

module.exports = pool;