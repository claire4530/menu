import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { name, reserveTime,	people,	tableNumber, phoneNumber, remark } = await req.json()

        const query = 'INSERT INTO reserve (name, reserveTime,	people,	tableNumber, phoneNumber, remark) VALUES (?, ?, ?, ?, ?, ?);'
        const values = [name, reserveTime,	people,	tableNumber, phoneNumber, remark]

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
            message: 'reserve added successfully',
        })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}