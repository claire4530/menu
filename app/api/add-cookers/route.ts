import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { cookerNumber, tableNumber , areas_id} =
            await req.json()

        const query =
            'INSERT INTO cooker (cookerNumber, state, tableNumber, fireStatus, error, reason, solution, broken, areas_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);'
        const values = [cookerNumber, "關閉", tableNumber, 1, "/", "/", "/", 0, areas_id]

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
            message: 'Table cooker insert successfully',cookerNumber
        })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}