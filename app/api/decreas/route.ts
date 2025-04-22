import { NextResponse } from 'next/server';
import db from '@/lib/db';

// Post
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    console.log('Received name:', name); // Log received name

    if (!name) {
      console.error('Name is required');
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    const query = 'UPDATE shopcart SET number = number - 1 WHERE name = ?';
    const values = [name];
    
    console.log('Executing query:', query, 'with values:', values); // Log query and values

    await new Promise((resolve, reject) => {
      db.query(query, values, (err: any, result: any) => {
        if (err) {
          console.error('Database query error:', err); // Log query errors
          reject(err);
        } else {
          console.log('Query result:', result); // Log query result
          resolve(true);
        }
      });
    });

    return NextResponse.json({ message: 'Quantity increased successfully' });
  } catch (error) {
    console.error('Caught error:', error); // Log caught errors
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}