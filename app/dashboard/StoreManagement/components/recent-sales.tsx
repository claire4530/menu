import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import dayjs from 'dayjs';

interface OrderDetail {
    id: number;
    orderTime: string;
    content: string;
    payment: number;
}

function parseContent(content: string) {
    const items: { name: string; quantity: number }[] = [];
    const itemRegex = /([^,]+?)\s*x\s*(\d+)/g;
    let match;
    while ((match = itemRegex.exec(content)) !== null) {
        items.push({ name: match[1].trim(), quantity: parseInt(match[2], 10) });
    }
    return items;
}

async function fetchSalesData(apiUrl: string, filterFn: (order: OrderDetail) => boolean) {
    const response = await fetch(`${apiUrl}/api/order-details`);
    const result: OrderDetail[] = await response.json();
    const salesData: { [key: string]: number } = {};

    result.filter(filterFn).forEach(order => {
        const items = parseContent(order.content);
        items.forEach(item => {
            if (!salesData[item.name]) {
                salesData[item.name] = 0;
            }
            salesData[item.name] += item.quantity;
        });
    });

    return Object.entries(salesData)
        .map(([name, quantity]) => ({ name, quantity }))
        .sort((a, b) => b.quantity - a.quantity); // 排序: 按照銷售量降序
}

export function RecentSalesDay() {
    const [dataDay, setDataDay] = useState<{ name: string; quantity: number }[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    useEffect(() => {
        const fetchData = async () => {
            const today = dayjs().format('YYYY-MM-DD');
            const salesData = await fetchSalesData(apiUrl, order =>
                dayjs(order.orderTime).format('YYYY-MM-DD') === today
            );
            setDataDay(salesData);
        };

        fetchData();
        const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次資料
        return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);

    return (
        <div className="space-y-8">
            {dataDay.map((item, index) => (
                <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt="Avatar" />
                        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{item.name}</p>
                    </div>
                    <div className="ml-auto font-medium">{item.quantity}</div>
                </div>
            ))}
        </div>
    );
}

export function RecentSalesMonth() {
    const [dataMonth, setDataMonth] = useState<{ name: string; quantity: number }[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    useEffect(() => {
        const fetchData = async () => {
            const thisMonth = dayjs().format('YYYY-MM');
            const salesData = await fetchSalesData(apiUrl, order =>
                dayjs(order.orderTime).format('YYYY-MM') === thisMonth
            );
            setDataMonth(salesData);
        };

        fetchData();
        const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次資料
        return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);

    return (
        <div className="space-y-8">
            {dataMonth.map((item, index) => (
                <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt="Avatar" />
                        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{item.name}</p>
                    </div>
                    <div className="ml-auto font-medium">{item.quantity}</div>
                </div>
            ))}
        </div>
    );
}

export function RecentSalesYear() {
    const [dataYear, setDataYear] = useState<{ name: string; quantity: number }[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    useEffect(() => {
        const fetchData = async () => {
            const thisYear = dayjs().format('YYYY');
            const salesData = await fetchSalesData(apiUrl, order =>
                dayjs(order.orderTime).format('YYYY') === thisYear
            );
            setDataYear(salesData);
        };

        fetchData();
        const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次資料
        return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);

    return (
        <div className="space-y-8">
            {dataYear.map((item, index) => (
                <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt="Avatar" />
                        <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{item.name}</p>
                    </div>
                    <div className="ml-auto font-medium">{item.quantity}</div>
                </div>
            ))}
        </div>
    );
}
