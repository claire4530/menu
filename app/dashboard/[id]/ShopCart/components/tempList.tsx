"use client"
import React, { useState, useEffect } from 'react';
import OrderItem from './orderRow';
import TotalSum from './totalSum';
import SubmitOrderDialog from './sumitButton';
import { Orderlist } from './types';

interface ShopcartItem {
  menu_id: number;
  name: string;
  money: number;
  number: number;
}

interface SideNavProps {
  id: string | string[];  // 定義 id 類型
}

const OrderList= ({ id }: SideNavProps) => {
  const [data, setData] = useState<Orderlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSum, setTotalSum] = useState(0);
  const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const decodedId = Array.isArray(id) ? id.map(decodeURIComponent).join(', ') : decodeURIComponent(id);

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/readCart`);
      const result: Orderlist[] = await response.json();
      const fliter = result.filter((item) => item.tableNumber === decodedId);
      setData(fliter);
      calculateTotal(fliter);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = (items: Orderlist[]) => {
    const sum = items.reduce((acc, item) => acc + (item.money * item.number), 0);
    setTotalSum(sum);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000); // Fetch every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [apiUrl]); 

  const increaseMealNumber = (index: number) => {
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].number += 1;
      calculateTotal(updatedData);
      return updatedData;
    });
  };

  const decreaseMealNumber = (index: number) => {
    setData(prevData => {
      const updatedData = [...prevData];
      if (updatedData[index].number > 1) {
        updatedData[index].number -= 1;
        calculateTotal(updatedData);
      }
      return updatedData;
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full p-2 grid gap-2">
      <div className="gap-2 flex justify-between text-[20px] font-semibold h-10 ml-2">
        <span>品項</span>
        <span>單價</span>
        <span>數量(份)</span>
        <span>小計</span>
        <span></span>
      </div>
      <div className="border-b"></div>
      <div className="flex flex-col gap-2 text-[20px] ">
        {data.map((item, index) => (
          <OrderItem
            key={item.id} // Assuming `id` is unique
            item={item}
            index={index}
            onQuantityDecreased={decreaseMealNumber}
            handleQuantityIncreased={increaseMealNumber}
            handleDelete={(id) => {
              // Implement the delete functionality here
              console.log(`Delete item with id ${id}`);
            }}
          />
        ))}
      </div>
      <div className="border-b"></div>
      <div className="flex justify-between items-center p-8">
        <TotalSum totalSum={totalSum} />
        <SubmitOrderDialog id={id}/>
      </div>
    </div>
  );
}

export default OrderList;