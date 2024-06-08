// pages/tabs-demo.js
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Table from './components/table';
import { Search } from './components/search';

export type Payment = {
    id: number;
    state: '用餐中' | '清潔中' | '空桌' | '已預定';
    orderNumber: string;
    remainingMealTime: number;
    totalMealTime: number;
    tableNumber: string;
    cookerNumber: number;
    seats: number;
};

export async function TabsDemo() {
    
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    
    const areas : Payment[] = await fetch(`${apiUrl}/api/areas`).then((res) => res.json());  

    return (
        <div className="hidden flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4 gap-4">
                    <h2 className="text-3xl font-bold tracking-tight flex-grow">
                        用餐區域
                    </h2>
                    <div className="ml-auto flex items-center space-x-4">
                        <Search />
                    </div>
                    <div className="ml-auto flex items-center space-x-4">
                        <Button variant="outline">清潔桌子</Button>
                    </div>
                </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2"></div>
                <div className="grid h-screen grid-cols-2 gap-x-16 gap-y-8 px-28">
                    {/* {users[0]?.state} */}
                    {areas.map((item, index) => (
                        <Table key={index} {...item}/>
                        // <div key={ item.user_id }>{ item.user_id }</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TabsDemo;
