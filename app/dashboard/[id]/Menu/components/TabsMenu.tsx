"use client"
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContent from './tabContent';
// import { MenuItem } from './types'; 
import { Utensils } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Menu {
  id: number;
  name: string;
}

interface MenuItem {
  id: number;
  name: string;
  menu_id: number;
  money: number;
  description: string;
  switchOn: number;
  image:string;
}


interface SideNavProps {
  id: string | string[];  // 定義 id 類型
}

interface TableRemainingTimeProps {
  tableNumber: string;
  state: string; // 餐桌的用餐開始時間
  orderNumber: string; // 訂單編號
}

const UpdateTable = ({ id }: SideNavProps) => {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tableNumber, setTableNumber] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [orderNumber, setOrderNumber] = useState<string>('');
  const decodedId = Array.isArray(id) ? id.map(decodeURIComponent).join(', ') : decodeURIComponent(id);

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  const fetchData = async () => {
    try {
      const [menuResponse, itemsResponse] = await Promise.all([
        fetch(`${apiUrl}/api/menu`),
        fetch(`${apiUrl}/api/menu-items`)
      ]);

      const menuResult = await menuResponse.json();
      const itemsResult = await itemsResponse.json();

      const response = await fetch(`${apiUrl}/api/areas`);
      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }
      const result: TableRemainingTimeProps[] = await response.json();
      const tableResult = result.find((item) => item.tableNumber === decodedId);
      // const tableResult = await tableResponse.json();

      setMenu(menuResult);
      setMenuItems(itemsResult);

      if (tableResult) {
        setTableNumber(tableResult.tableNumber);
        setState(tableResult.state);
        setOrderNumber(tableResult.orderNumber);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateState = async (state: string, tableNumber: string) => {
    try {
        const response = await fetch(`${apiUrl}/api/edit-table-state`, {
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

  useEffect(() => {
    fetchData(); // 初次獲取資料
  }, [id]);

  useEffect(() => {
    const handleStateChange = async () => {
      if (state !== '用餐中') {
        // 只有當 `state` 不等於 '用餐中' 時才進行更新
        await updateState('用餐中', tableNumber); // 更新狀態為 "用餐中"
        setState('用餐中'); // 設置當前狀態為 "用餐中"
      }
    };

    if (state) {
      handleStateChange(); // 確保只在獲取到初始狀態後才執行更新
    }
  }, [state, tableNumber]); // 監聽 `state` 和 `tableNumber` 的變化

  useEffect(() => {
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tabs defaultValue="area-15">
      <TabsList className="h-full grid grid-cols-6">
        {Array.isArray(menu) && menu.map((menuItem, index: number) => (
          <TabsTrigger
            key={menuItem.id}
            value={`area-${menuItem.id}`}
            className="h-[50px] min-w-[12rem]"
          >
            <div className='grid grid-cols-6 w-full'>
              <div className="flex justify-start col-span-6 font-medium text-base truncate ...">
                <p className="font-bold text-base truncate ...">{menuItem.name}</p>
              </div>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      {Array.isArray(menu) && menu.map((menuItem) => (
        <TabsContent key={menuItem.id} value={`area-${menuItem.id}`}>
          <Card>
            <CardHeader className="gap-3">
              <CardTitle className="font-medium text-xl flex justify-between">
                <div className="flex gap-2">
                  <Utensils />
                  {menuItem.name}
                </div>
              </CardTitle>
              <div className="border-b"></div>
            </CardHeader>
            <CardContent className="flex gap-14">
              <TabContent menuItems={menuItems} menuId={menuItem.id} id={id} orderNumber={orderNumber}/>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};


export default UpdateTable;