const mysql = require('mysql')

let pool = mysql.createPool({
    "user": "root",
    "password": "123",
    "database": "trabalho_hotel",
    "host": "localhost",
    "port": 3306
});

exports.pool = pool;