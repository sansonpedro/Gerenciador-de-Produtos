const mysql = require("mysql2");

// Cria o Pool de conexões com o banco de dados
const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud_produtos",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});