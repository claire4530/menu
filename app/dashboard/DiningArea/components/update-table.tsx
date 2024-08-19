// components/UpdateTable.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Table from './table';

export type Payment = {
    id: number;
    state: '用餐中' | '清潔中' | '空桌' | '已預定';
    orderNumber: string;
    remainingMealTime: number;
    totalMealTime: number;
    tableNumber: string;
    cookerNumber: number;
    seats: number;
    notify: string;
};


const UpdateTable = ({ initialAreas }: { initialAreas: Payment[] }) => {
    const [areas, setAreas] = useState<Payment[]>(initialAreas);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const areasArray = Array.isArray(areas) ? areas : [];

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/areas`);
            const result = await response.json();
            setAreas(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(fetchData, 1000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid h-screen grid-cols-2 gap-x-16 gap-y-8 px-28">
            {areasArray.map((item, index) => (
                <Table key={index} {...item} fetchTableData={fetchData} areas_id={item.id}/>
            ))}
        </div>
    );
};

export default UpdateTable;

