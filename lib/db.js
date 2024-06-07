// // db.js
// import mysql from 'serverless-mysql';
// const db = mysql({
//   config: {
//     host: process.env.MYSQL_HOST,
//     port: process.env.MYSQL_PORT,
//     database: process.env.MYSQL_DATABASE,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD
//   }
// });
// export default async function excuteQuery({ query, values }) {
//   try {
//     const results = await db.query(query, values);
//     await db.end();
//     return results;
//   } catch (error) {
//     return { error };
//   }
// }
// db.js

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