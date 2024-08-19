'use client'

import React, { useEffect, useState } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
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

interface PowerUsage {
    powerTime: string;
    watt: number;
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
            const response = await fetch(`${apiUrl}/api/power-usage`);
            const result: PowerUsage[] = await response.json();

            // 初始化每月的用電量為0
            const monthlyData: { [key: string]: number } = {
                Jan: 0, Feb: 0, Mar: 0, Apr: 0, 
                May: 0, Jun: 0, Jul: 0, Aug: 0, 
                Sep: 0, Oct: 0, Nov: 0, Dec: 0
            };
            
            result.forEach(usage => {
                const month = dayjs(usage.powerTime).format('MMM');
                monthlyData[month] += usage.watt;
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
            <LineChart data={dataYear}>
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
                    tickFormatter={(value) => `${value} W`}
                />
                <Line
                    type="monotone"
                    dataKey="total"
                    stroke="currentColor"
                    dot={true}
                />
            </LineChart>
        </ChartContainer>
    );
}

// OverviewMonth 組件
export function OverviewMonth() {
    const [dataMonth, setDataMonth] = useState<Area[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/power-usage`);
            const result: PowerUsage[] = await response.json();

            // 獲取當月的天數
            const currentDate = dayjs();
            const daysInMonth = currentDate.daysInMonth();

            // 初始化每日的用電量為0
            const dailyData: { [key: string]: number } = {};
            for (let i = 1; i <= daysInMonth; i++) {
                const day = i < 10 ? `0${i}` : `${i}`;
                dailyData[day] = 0;
            }

            result.forEach(usage => {
                const day = dayjs(usage.powerTime).format('DD');
                dailyData[day] += usage.watt;
            });

            // 將數據按日期排序
            const data = Object.keys(dailyData)
                .sort((a, b) => parseInt(a) - parseInt(b)) // 排序
                .map(day => ({
                    name: day,
                    total: dailyData[day],
                }));

            setDataMonth(data);
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
            <LineChart data={dataMonth}>
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
                    tickFormatter={(value) => `${value} W`}
                />
                <Line
                    type="monotone"
                    dataKey="total"
                    stroke="currentColor"
                    dot={true}
                />
            </LineChart>
        </ChartContainer>
    );
}

// OverviewDay 組件
export function OverviewDay() {
    const [dataDay, setDataDay] = useState<{ name: string; total: number }[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/power-usage`);
            const result: PowerUsage[] = await response.json();

            // 獲取當前日期
            const today = dayjs().format('YYYY-MM-DD');

            // 初始化每小時的用電量為0
            const hourlyData: { [key: string]: number } = {};
            for (let i = 0; i < 24; i++) {
                const hour = i < 10 ? `0${i}` : `${i}`;
                hourlyData[hour] = 0;
            }

            // 過濾出當日的用電量並統計每小時的用電量
            result.forEach(usage => {
                const usageDate = dayjs(usage.powerTime).format('YYYY-MM-DD');
                if (usageDate === today) {
                    const hour = dayjs(usage.powerTime).format('HH');
                    hourlyData[hour] += usage.watt;
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
            <LineChart data={dataDay}>
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
                    tickFormatter={(value) => `${value} W`}
                />
                <Line
                    type="monotone"
                    dataKey="total"
                    stroke="currentColor"
                    dot={true}
                />
            </LineChart>
        </ChartContainer>
    );
}

