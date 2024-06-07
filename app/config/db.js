// const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'sa',
//     password: "123",
//     database: "test1"
// });

// db.connect((err) => {
//     if (err) {
//         console.log('Error connecting to database:', err);
//     }else{
//         console.log('Connected to database');
//     }
// });

// module.exports = db;
import sql from 'mssql'

// connection configs
const config = {
    user: 'sa',
    password: '123',
    server: '127.0.0.1',
    database: 'test1',
    port: 1433,
    options: {
        instancename: 'SQLEXPRESS',
        trustedconnection: true,
        trustServerCertificate: true
    },
}

export default async function ExcuteQuery(query, options) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query(query);
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}