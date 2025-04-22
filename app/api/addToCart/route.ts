import { NextResponse } from 'next/server';
import db from '@/lib/db';

// Post
export async function POST(req: Request) {
  try {
    const { tableNumber, orderNumber, menu_id, name, money, number, state } = await req.json();
    console.log('Received data:', { tableNumber, orderNumber, menu_id, name, money, number, state });

    if (!tableNumber || !orderNumber || !menu_id || !name || !money || !number || !state) {
      throw new Error('Missing required fields');
    }

    // Check if there are items with the same name and state '新增'
    const checkQuery = 'SELECT * FROM shopcart WHERE name = ? AND state = "新增"';
    const checkValues = [name];

    const existingItems: any[] = await new Promise((resolve, reject) => {
      db.query(checkQuery, checkValues, (err: any, results: any) => {
        if (err) {
          console.error('Error checking item:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    const deletedItem = existingItems.find(item => item.state === '刪除');
    const submittedItem = existingItems.find(item => item.state === '送出');
    const newItem = existingItems.find(item => item.state === '新增');

    if (deletedItem || submittedItem) {
      // If there's a deleted or submitted item, insert a new item
      const insertQuery = 'INSERT INTO shopcart (tableNumber, orderNumber, menu_id, name, money, number, state) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const insertValues = [tableNumber, orderNumber, menu_id, name, money, number, state];

      await new Promise((resolve, reject) => {
        db.query(insertQuery, insertValues, (err: any) => {
          if (err) {
            console.error('Error inserting item:', err);
            reject(err);
          } else {
            resolve(true);
          }
        });
      });

      console.log('Item successfully added to shopcart');
      return NextResponse.json({ message: 'Item successfully added to shopcart' });
    } else if (newItem) {
      // If there's an item with the same name and state '新增', update its number
      const updateQuery = 'UPDATE shopcart SET number = number + ? WHERE id = ?';
      const updateValues = [number, newItem.id];

      await new Promise((resolve, reject) => {
        db.query(updateQuery, updateValues, (err: any) => {
          if (err) {
            console.error('Error updating item:', err);
            reject(err);
          } else {
            resolve(true);
          }
        });
      });

      console.log('Item quantity updated successfully');
      return NextResponse.json({ message: 'Item quantity updated successfully' });
    } else {
      // If no matching item, insert a new item
      const insertQuery = 'INSERT INTO shopcart (tableNumber, orderNumber, menu_id, name, money, number, state) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const insertValues = [tableNumber, orderNumber, menu_id, name, money, number, state];

      await new Promise((resolve, reject) => {
        db.query(insertQuery, insertValues, (err: any) => {
          if (err) {
            console.error('Error inserting item:', err);
            reject(err);
          } else {
            resolve(true);
          }
        });
      });

      console.log('Item successfully added to shopcart');
      return NextResponse.json({ message: 'Item successfully added to shopcart' });
    }
  } catch (error) {
    console.error('Error adding item to shopcart:', error);
    return NextResponse.json({ status: 500, message: error});
  }
}