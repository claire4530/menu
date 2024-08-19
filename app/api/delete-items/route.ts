import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { id } =
            await req.json()

        const query =
            'DELETE FROM menu_items WHERE id = ?;'
        const values = [ id ]

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
            message: 'delete successfully',id
        })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}
