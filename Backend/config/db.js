const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized:false
    }
});

db.connect((err) => {
    if (err) {
        console.error('Erreur connexion MySQL :', err);
    } else {
        console.log('✅ MySQL connecté !');
    }
});

module.exports = db;
