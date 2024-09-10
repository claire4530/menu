'use client'

import React, { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import dayjs from 'dayjs';
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// ChartConfig 物件
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

interface OrderDetail {
    orderTime: string;
    payment: number;
}

interface Area {
    name: string;
    total: number;
}

// OverviewYear 組件
export function OverviewYear() {
    const [dataYear, setDataYear] = useState<Area[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/order-details`);
            const result: OrderDetail[] = await response.json();
            
            // 初始化每月的營收為0
            const monthlyData: { [key: string]: number } = {
                Jan: 0, Feb: 0, Mar: 0, Apr: 0, 
                May: 0, Jun: 0, Jul: 0, Aug: 0, 
                Sep: 0, Oct: 0, Nov: 0, Dec: 0
            };
            
            result.forEach(order => {
                const month = dayjs(order.orderTime).format('MMM');
                monthlyData[month] += order.payment;
            });
            
            const data = Object.keys(monthlyData).map(month => ({
                name: month,
                total: monthlyData[month],
            }));
            
            setDataYear(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次資料

        return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);

    return (
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart data={dataYear}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ChartContainer>
    );
}

// OverviewMonth 組件
export function OverviewMonth() {
    const [dataMonth, setDataMonth] = useState<Area[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/order-details`);
            const result: OrderDetail[] = await response.json();
            
            // 獲取當前月份的起始與結束時間
            const currentDate = dayjs();
            const startOfMonth = currentDate.startOf('month');
            const endOfMonth = currentDate.endOf('month');
            
            // 過濾只保留本月的訂單
            const filteredOrders = result.filter(order => {
                const orderDate = dayjs(order.orderTime);
                return orderDate.isAfter(startOfMonth) && orderDate.isBefore(endOfMonth);
            });
            
            // 獲取當月的天數
            const daysInMonth = currentDate.daysInMonth();
            
            // 初始化每日的營收為0
            const dailyData: { [key: string]: number } = {};
            for (let i = 1; i <= daysInMonth; i++) {
                const day = i < 10 ? `0${i}` : `${i}`;
                dailyData[day] = 0;
            }
            
            // 累加本月的訂單數據
            filteredOrders.forEach(order => {
                const day = dayjs(order.orderTime).format('DD');
                dailyData[day] += order.payment;
            });
            
            // 將數據按日期排序並準備數據格式
            const data = Object.keys(dailyData)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map(day => ({
                    name: day,
                    total: dailyData[day],
                }));
            
            setDataMonth(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setDataMonth([]);  // 如果請求失敗，清空數據
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次資料

        return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);

    return (
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart data={dataMonth}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ChartContainer>
    );
}

// OverviewDay 組件
export function OverviewDay() {
    const [dataDay, setDataDay] = useState<{ name: string; total: number }[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/order-details`);
            const result: OrderDetail[] = await response.json();

            // 獲取當前日期
            const today = dayjs().format('YYYY-MM-DD');

            // 初始化每小時的營收為0
            const hourlyData: { [key: string]: number } = {};
            for (let i = 0; i < 24; i++) {
                const hour = i < 10 ? `0${i}` : `${i}`;
                hourlyData[hour] = 0;
            }

            // 過濾出當日的訂單並統計每小時的營收
            result.forEach(order => {
                const orderDate = dayjs(order.orderTime).format('YYYY-MM-DD');
                if (orderDate === today) {
                    const hour = dayjs(order.orderTime).format('HH');
                    hourlyData[hour] += order.payment;
                }
            });

            // 將數據按小時排序
            const data = Object.keys(hourlyData)
                .sort() // 按鍵（即小時）進行排序
                .map(hour => ({
                    name: hour,
                    total: hourlyData[hour],
                }));

            setDataDay(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次資料

        return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);

    return (
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart data={dataDay}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ChartContainer>
    );
}
