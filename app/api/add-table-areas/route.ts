import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { state, tableNumber, cookerNumber, seats, socketNumber } =
            await req.json()

        const query =
            'INSERT INTO areas (state, tableNumber, cookerNumber, seats, socketNumber, notify, business_id) VALUES (?, ?, ?, ?, ?, ?, ?);'
        const values = ["空桌", tableNumber, cookerNumber, seats, socketNumber, "已處理", "1"]

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
            message: 'Table state updated successfully',
        })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}