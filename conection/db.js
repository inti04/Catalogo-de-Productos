const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Apositivo2004*',
    database: 'catalogo'
});

module.exports = pool;
