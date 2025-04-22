import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { tableNumber, orderNumber, menu_id, name, money, number, state } = await req.json();

        // Validate input
        if (!tableNumber || !menu_id || !name || money == null || !number || !state) {
            return NextResponse.json(
                { message: 'Invalid input data' },
                { status: 400 }
            );
        }

        const query =
            'INSERT INTO orderlist (tableNumber, orderNumber, menu_id, name, money, number, state) VALUES (?, ?, ?, ?, ?, ?, ?);';
        const values = [tableNumber, orderNumber, menu_id, name, money, number, state];

        await new Promise((resolve, reject) => {
            db.query(query, values, (err: any) => {
                if (err) {
                    console.error('Database Error:', err); // Log error for debugging
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });

        return NextResponse.json({
            message: 'Order added successfully',
        });
    } catch (error: any) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
