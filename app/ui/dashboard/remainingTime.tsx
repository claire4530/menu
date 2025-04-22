'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import dayjs from 'dayjs';

interface DiningProps {
    id: string; // 餐桌編號
}

interface TableRemainingTimeProps {
    tableNumber: string;
    startTime: string; // 餐桌的用餐開始時間
    remainingMealTime: number; // 用餐時間（分鐘）
}

const RemainingTime: React.FC<DiningProps> = ({ id }) => {
    const [remainingTime, setRemainingTime] = useState<number | null>(null); // 剩餘時間（分鐘）
    const [error, setError] = useState<string | null>(null); // 錯誤訊息
    const [isTimeUp, setIsTimeUp] = useState<boolean>(false); // 用於標記時間是否到達
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/areas`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result: TableRemainingTimeProps[] = await response.json();
            const tableData = result.find((item) => item.tableNumber === id);

            if (tableData) {
                const { startTime, remainingMealTime } = tableData;

                const endTime = dayjs(startTime).add(remainingMealTime, 'minute'); // 計算結束時間
                const now = dayjs();
                const timeLeft = Math.max(endTime.diff(now, 'minute'), 0); // 計算剩餘分鐘數，確保非負數

                setRemainingTime(timeLeft);
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
    }, [id]);

    useEffect(() => {
        if (remainingTime === null) return; // 若未初始化，則不啟動計時器

        const interval = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev === null || prev <= 0) {
                    clearInterval(interval); // 停止計時器
                    setIsTimeUp(true); // 標記時間到
                    return 0;
                }
                return prev - 1; // 每分鐘減 1
            });
        }, 60000); // 每分鐘更新一次

        return () => clearInterval(interval); // 清理計時器
    }, [remainingTime]);

    return (
        <div className='hover:bg-[#71503e] hover:text-white rounded-lg'>
            {error ? (
                <div className="text-red-500">{error}</div>
            ) : isTimeUp ? (
                <div className="p-4 text-center font-bold text-red-500">
                    時間已到
                </div>
            ) : remainingTime !== null ? (
                <div className='p-4 space-y-4'>
                    <div className='text-sm font-bold'>剩餘時間</div>
                    <div className='font-bold flex'>
                        <div className='text-5xl px-4'>{remainingTime}</div>
                        <p className='mt-5'>分鐘</p>
                    </div>
                </div>
            ) : (
                <div className="p-4 text-center">載入中...</div>
            )}
        </div>
    );
};

export default RemainingTime;

