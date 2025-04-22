import React, { useState, useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import ContinueAddingButton from './continueAddingButton'; 
import OrderItem from './orderRow';
import { Orderlist } from './types';

interface ShopcartItem {
  id: number;
  menu_id: number; // Note: menu_id is a number in your data
  name: string;
  money: number;
  number: number;
  state: string;
  orderNumber: string | null;
  tableNumber: string;
  time: string; // Add this field if it's present in your data
}
interface SideNavProps {
  id: string | string[];  // 定義 id 類型
}
const SubmitOrderDialog= ({ id }: SideNavProps) => {
  const [shopcart, setShopcart] = useState<ShopcartItem[]>([]);
  const [orderlist, setOrderlist] = useState<ShopcartItem[]>([]);
  const decodedId = Array.isArray(id) ? id.map(decodeURIComponent).join(', ') : decodeURIComponent(id);
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  useEffect(() => {
    const fetchShopcart = async () => {
      try {
        const response = await fetch('/api/readCart');
        if (!response.ok) {
          throw new Error('Failed to fetch shopcart');
        }
        const data: ShopcartItem[] = await response.json();
        const fliter = data.filter((item) => item.tableNumber === decodedId);
        console.log('Fetched shopcart data:', data);
        setShopcart(fliter);
      } catch (error) {
        console.error('Error fetching shopcart:', error);
      }
    };

    const fetchOrderlist = async () => {
      try {
        const response = await fetch('/api/readOrderlist');
        if (!response.ok) {
          throw new Error('Failed to fetch orderlist');
        }
        // const data = await response.json();
        const data: ShopcartItem[] = await response.json();
        const fliter = data.filter((item) => item.tableNumber === decodedId);
        console.log('Fetched orderlist data:', data);
        setOrderlist(fliter);
      } catch (error) {
        console.error('Error fetching orderlist:', error);
      }
    };

    fetchShopcart();
    fetchOrderlist();
  }, []);

  const filteredItems = shopcart.filter(item => {
    console.log('Checking item state:', item.state);
    return item.state === '新增';
  });

  console.log('Filtered shopcart items:', filteredItems);

  const newItems = filteredItems.filter(item => {
    console.log('Checking if item is in orderlist:', item);
    return !orderlist.some(orderItem =>
      orderItem.tableNumber === item.tableNumber &&
      orderItem.orderNumber === item.orderNumber &&
      orderItem.menu_id === item.menu_id &&
      orderItem.name === item.name &&
      orderItem.money === item.money &&
      orderItem.number === item.number &&
      orderItem.state === "未付款"
    );
  });

  console.log('New items to add to orderlist:', newItems);
  const updateResponse = async (state: string, tableNumber: string) => {
    try {
        const response = await fetch(`${apiUrl}/api/updateShopcartState`, {
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
  const handleSubmit = async () => {
    if (newItems.length === 0) {
      console.error('No new items to submit');
      return;
    }

    try {
      const addPromises = newItems.map(async (orderItem) => {
        const response = await fetch('/api/addOrderlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...orderItem          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add item to orderlist');
        }
        const data = await response.json();
        console.log(data.message);
      });

      await Promise.all(addPromises);
      updateResponse('新增', decodedId);
      
    } catch (error) {
      console.error('Error adding items to orderlist:', error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="mr-4 px-8 py-5 bg-[#bf6c41] text-white font-semibold hover:bg-[#8d4a28] hover:text-white">
          送出訂單
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>確認送出訂單?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogAction onClick={handleSubmit}>
              確認
            </AlertDialogAction>
            <AlertDialogCancel>返回</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default SubmitOrderDialog;