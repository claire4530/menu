import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { socketNumber, tableNumber, areas_id } =
            await req.json()

        const query =
            'INSERT INTO socket (socketNumber, state, tableNumber, error, reason, solution, broken, areas_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);'
        const values = [socketNumber, "關閉", tableNumber, "/", "/", "/", 0, areas_id]

        await new Promise((resolve, reject) => {
            db.query(query, values, (err: any) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
        })

        return NextResponse.json({
            message: 'Table state updated successfully',socketNumber
        })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}