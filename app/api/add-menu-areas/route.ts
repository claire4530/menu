import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { name } =
            await req.json()

        const query =
            'INSERT INTO menu (name) VALUES (?);'
        const values = [name]

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
            message: 'menu added successfully',
        })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}