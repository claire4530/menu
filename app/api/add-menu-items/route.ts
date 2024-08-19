import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { name, menu_id, description, money, switchOn, image } =
            await req.json()

        const query =
            'INSERT INTO menu_items (name, menu_id, description, money, switchOn, image) VALUES (?, ?, ?, ?, ?, ?);'
        const values = [name, menu_id, description, money, switchOn, image]

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
            message: 'menu_items updated successfully'
        })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}