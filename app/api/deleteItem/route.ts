import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { id } = await request.json(); // Retrieve the id from the request body
    
    await new Promise((resolve, reject) => {
      db.query('UPDATE shopcart SET state = ? WHERE id = ?', ['刪除', id], (err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
    return NextResponse.json({ message: 'State updated to 刪除 successfully' });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}