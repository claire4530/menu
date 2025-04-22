'use client'
import React, { useState, useEffect, use } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import dayjs from 'dayjs'

export interface MealDetail {
    name: string;
    money: number;
    number: number;
    tableNumber: string;
  }

  interface MenuPageProps {
    params: {
        id: string;
    };
}

interface TableRemainingTimeProps {
  tableNumber: string; // 餐桌編號
  startTime: string; // 餐桌的用餐開始時間
  orderNumber: string; // 訂單編號
  seats: number; // 人數
  orderTime: string; // 訂單時間
  content: string; // 訂單內容
  payment: number; // 付款方式
}

export default function Page({ params }: MenuPageProps) {
  const { id } = params;
  const decodedId = Array.isArray(id) ? id.map(decodeURIComponent).join(', ') : decodeURIComponent(id);
  const [mealDetails, setMealDetails] = useState<MealDetail[]>([]);
  const [total, setTotal] = useState<number>(0);
  const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  const [startTime, setStartTime] = useState<string>(''); // 開始用餐時間
  const [order, setOrder] = useState<string>(''); // 訂單編號
  const [table, setTable] = useState<string>(''); // 桌號
  const [people, setPeople] = useState<number>(0); // 人數
  const [content, setContent] = useState<string>(''); // 訂單時間
  const [payment, setPayment] = useState<number>(0); // 訂單時間
  const [error, setError] = useState<string | null>(null); // 儲存錯誤訊息


  const fetchDataOrder = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/order-details`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const result: TableRemainingTimeProps[] = await response.json();
        
        // 篩選出對應餐桌的所有資料
        const tableData = result.filter((item) => item.tableNumber === decodedId);
        
        if (tableData.length > 0) {
            // 按照 orderTime 排序，取得最新的一筆資料
            const lastTableData = tableData.sort((a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime())[0];

            // 在這裡處理 lastTableData
            if (lastTableData) {
                const start = dayjs(lastTableData.startTime);
                setStartTime(start.format('YYYY-MM-DD HH:mm:ss'));
                setOrder(lastTableData.orderNumber);
                setContent(lastTableData.content);
                setPayment(lastTableData.payment);
            } else {
                setError('Table not found');
            }
            console.log(lastTableData);
        } else {
            console.log('No data found for the given table');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


  const fetchData = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/areas`); // 修正字串插值
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const result: TableRemainingTimeProps[] = await response.json();
        const tableData = result.find((item) => item.tableNumber === decodedId); // 查找對應的餐桌

        if (tableData) {
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
    fetchData();
    fetchDataOrder();
  }, [id]);

  return (
    <div className="bg-[#f5efe4] flex justify-center items-center h-screen">
      <Card className="w-[400px] h-auto">
        <CardHeader>
          <div className="flex justify-center items-center">
            <CardTitle>用餐明細</CardTitle>
            {/* {mealDetails} */}
          </div>
        </CardHeader>
        <CardContent>
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
                {/* <div>單價</div> */}
                <div>數量</div>
                {/* <div>小計</div> */}
              </div>
              <hr className="border-t-2 border-gray-300" />
              <div className="flex flex-col">
                {content.split(' ').map((item, index) => {
                  // 假設內容中每兩個詞一組，組成「名稱 x 數量」
                  if (index % 2 === 0) {
                    return (
                      <div key={index}>{content.split(' ')[index]} {content.split(' ')[index + 1]}</div>
                    );
                  }
                })}
              </div>
              <br />
              <strong>總計: {payment.toLocaleString()}</strong>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* Optional footer content */}
        </CardFooter>
      </Card>
    </div>
  );
}
