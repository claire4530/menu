// import { NextResponse } from "next/server";
// import db from "../../config/db";
// import { promises } from "dns";

// export async function GET(){
//     try {
//         const results = await new Promise((resolve, reject) => {
//             db.query('SELECT * FROM products', (err: any, results: []) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });
//         console.log(results);
//         return NextResponse.json(results);
//     } catch (error) {
//         return NextResponse.json(
//             { message: error }, 
//             { status: 500}
//         );
//     }
// }
// api/hello.js
import ExcuteQuery from '../../config/db';

export default async function handler(req: any, res: any) {

    console.log(await ExcuteQuery('select * from areas'));

    res.status(200).json({})
}