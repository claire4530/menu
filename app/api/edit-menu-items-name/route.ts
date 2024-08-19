import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
    console.log("188asdasdsda188asdasdsda188asdasdsda188asdasdsda188asdasdsda188asdasdsda188asdasdsda188asdasdsda188asdasdsda188asdasdsda188asdasdsda188asdasdsda188asdasdsda188asdasdsda188asdasdsda188asdasdsda188asdasdsda");
    
    try {
        const { id, name, description, money, switchOn, image } = await req.json()
        console.log(id, name, description, money, switchOn, image);
        

        const query = 'UPDATE menu_items SET name = ?, description = ?, money = ?, switchOn = ?, image = ? WHERE id = ?;'
        console.log(query);
        
        const values = [name, description, money, switchOn, image, id]
        console.log(values);
        

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
            message: 'Menu Items Name updated successfully',
        })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}
