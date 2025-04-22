import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { startTime, state, orderNumber, tableNumber } = await req.json()

        const query = 'UPDATE areas SET startTime = ?, state = ?, orderNumber = ? WHERE tableNumber = ?;'
        const values = [ startTime, state, orderNumber, tableNumber ]

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