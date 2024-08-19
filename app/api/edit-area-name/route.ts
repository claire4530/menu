import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { id, tableNumber, cookerNumber, seats, socketNumber } = await req.json()

        const query = 'UPDATE areas SET tableNumber = ?, cookerNumber = ?, seats = ?, socketNumber = ? WHERE id = ?;'
        const values = [tableNumber, cookerNumber, seats, socketNumber, id]

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