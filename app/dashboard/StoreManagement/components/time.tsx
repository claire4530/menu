'use client'
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField'
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useState } from 'react'

// 定義 Business 介面
interface Business {
    start_time: string
    end_time: string
}

interface TimePickersProps {
    onTimeChange: (startTime: dayjs.Dayjs, endTime: dayjs.Dayjs) => void;
    onError: (error: string | null) => void;
}

export function ResponsiveTimePickers({ onTimeChange, onError }: TimePickersProps) {
    const [value, setValue] = useState<Dayjs[]>([dayjs(), dayjs()]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    // 從資料庫獲取資料並更新時間
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/business`);
            const result = await response.json();
            if (result.length > 0) {
                const business = result[0]; // 假設 API 回傳的陣列中只有一個商業資料
                const startTime = dayjs(business.start_time, "HH:mm:ss").format("hh:mm A"); // 轉換成12小時制並移除秒數
                const endTime = dayjs(business.end_time, "HH:mm:ss").format("hh:mm A"); // 同上
                setValue([dayjs(startTime, "hh:mm A"), dayjs(endTime, "hh:mm A")]); // 更新時間選擇器的值
                onTimeChange(dayjs(startTime, "hh:mm A"), dayjs(endTime, "hh:mm A"));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            onError('無法獲取時間數據');
        }
    };

    useEffect(() => {
        fetchData();
        // const intervalId = setInterval(fetchData, 5000); // 每三秒抓取一次資料

        // return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiInputTimeRangeField
                value={[value[0], value[1]]}
                onChange={(newValue: [Dayjs | null, Dayjs | null]) => {
                    const convertedValue: Dayjs[] = [
                        newValue[0] || dayjs(),
                        newValue[1] || dayjs(),
                    ];
                    setValue(convertedValue);
                    onTimeChange(convertedValue[0], convertedValue[1]);
                    onError(null);
                }}
                onError={(error) => {
                    console.error(error);
                    onError(error as unknown as string);
                }}
            />
        </LocalizationProvider>
    );
}

