"use client";

import React, { useState, useEffect } from 'react';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import dayjs from 'dayjs'

export interface MealDetail {
  name: string;
  money: number;
  number: number;
  tableNumber: string;
  orderNumber: string;
}

interface TableRemainingTimeProps {
  tableNumber: string; // 餐桌編號
  startTime: string; // 餐桌的用餐開始時間
  orderNumber: string; // 訂單編號
  seats: number; // 人數
}

const CheckoutButton: React.FC<{ id: string }> = ({ id }) => {
  const [mealDetails, setMealDetails] = useState<MealDetail[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const decodedId = Array.isArray(id) ? id.map(decodeURIComponent).join(', ') : decodeURIComponent(id);

  const fetchMealDetails = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/readOrderlist`);
      const responseArea = await fetch(`${apiUrl}/api/areas`);
      const data: MealDetail[] = await response.json();
      const dataArea: TableRemainingTimeProps[] = await responseArea.json();
      const fliterArea = dataArea.filter((item) => item.tableNumber === decodedId);
      const fliter = data.filter((item) => item.orderNumber === fliterArea[0].orderNumber);
      const groupedData = groupMealDetails(fliter);
      setMealDetails(groupedData);
      calculateTotal(groupedData);
    } catch (error) {
      console.error('Error fetching meal details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupMealDetails = (data: MealDetail[]): MealDetail[] => {
    const mealMap = new Map<string, MealDetail>();
    data.forEach((meal) => {
      if (mealMap.has(meal.name)) {
        const existingMeal = mealMap.get(meal.name)!;
        existingMeal.number += meal.number;
      } else {
        mealMap.set(meal.name, { ...meal });
      }
    });
    return Array.from(mealMap.values());
  };

  const calculateTotal = (data: MealDetail[]) => {
    const totalPrice = data.reduce((acc, meal) => acc + meal.money * meal.number, 0);
    setTotal(totalPrice);
  };

  
  const [startTime, setStartTime] = useState<string>(''); // 開始用餐時間
  const [order, setOrder] = useState<string>(''); // 訂單編號
  const [table, setTable] = useState<string>(''); // 桌號
  const [people, setPeople] = useState<number>(0); // 人數
  const [error, setError] = useState<string | null>(null); // 儲存錯誤訊息

  const fetchData = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/areas`); // 修正字串插值
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const result: TableRemainingTimeProps[] = await response.json();
        const tableData = result.find((item) => item.tableNumber === id); // 查找對應的餐桌

        if (tableData) {
            const start = dayjs(tableData.startTime);
            setStartTime(start.format('YYYY-MM-DD HH:mm:ss'));
            setOrder(tableData.orderNumber);
            setTable(tableData.tableNumber);
            setPeople(tableData.seats);
        } else {
            setError('Table not found');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
    }
  };

  useEffect(() => {
    fetchMealDetails();
    fetchData();
    const interval = setInterval(() => {
      fetchMealDetails();
    }, 1000); // Fetch every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [apiUrl]);

  const updatePaystate = async (state: string, tableNumber: string) => {
        try {
            const response = await fetch(`${apiUrl}/api/updatePaystate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ state, tableNumber }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order number');
            }
        } catch (error) {
            console.error('Error updating order number:', error);
        }
    };
    
    const updateStartTime = async (startTime: string, state: string, orderNumber: string, tableNumber: string) => {
      try {
          const response = await fetch(`${apiUrl}/api/updateStartTime`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ startTime, state, orderNumber, tableNumber }),
          });

          if (!response.ok) {
              throw new Error('Failed to update order number');
          }
      } catch (error) {
          console.error('Error updating order number:', error);
      }
  };

  const handleConfirmClick = async () => {
    updatePaystate('付款中', table);
    updateStartTime('', '清潔中', '', table);
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className='hover:bg-[#71503e] hover:text-white rounded-lg h-[48px] flex gap-2 w-[240px]'>
            <BanknotesIcon className="ml-3 flex-end w-6" />
            <p className="font-semibold mt-3 text-sm">結帳</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>結束用餐並結帳?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <strong className='space-x-2'>
                  開始用餐時間 :{startTime}<br />
                  訂單編號 :{order}<br />
                  桌號 : {table}<br />
                  人數 : {people}人
                </strong> 
                <br />
                <div className="grid grid-cols-4 gap-4 font-bold">
                  <div>品項</div>
                  <div>單價</div>
                  <div>數量</div>
                  <div>小計</div>
                </div>
                <hr className="border-t-2 border-gray-300" />
                {mealDetails.map((meal, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4">
                    <div>{meal.name}</div>
                    <div>{meal.money}</div>
                    <div>x{meal.number}</div>
                    <div>{(meal.money * meal.number).toLocaleString()}</div>
                  </div>
                ))}
                <br />
                <strong>總計: {total.toLocaleString()}</strong>
              </div>
            </div>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <Link href={`/${id}/endToPay`} >
              <AlertDialogAction onClick={handleConfirmClick}>確認</AlertDialogAction>
            </Link>
            <AlertDialogCancel>返回</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CheckoutButton;
