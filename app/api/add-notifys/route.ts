import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
    try {
        const {tableNumber, AlerTime , areas_id} =
            await req.json()

        const query =
            'INSERT INTO notify ( tableNumber, state, alertTime, event, stateButton, areas_id) VALUES ( ?, ?, ?, ?, ?, ?);'
        const values = [ tableNumber, "待處理", AlerTime, "呼叫服務員", "前往處理", areas_id]

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
            message: 'notify insert successfully',
        })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}