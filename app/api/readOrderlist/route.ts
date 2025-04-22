import { NextResponse } from 'next/server';
import db from '@/lib/db';

// Get
export async function GET() {
  try {
    const results = await new Promise<any[]>((resolve, reject) => {
      db.query("SELECT * FROM orderlist WHERE state = '新增'", (err: any, results: any[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    console.log(results);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message:error }, { status: 500 });
  }
}
