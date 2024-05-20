const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1031647462Nm',
    database: 'fotology_app'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('Base de datos conectada');
});

module.exports = db;