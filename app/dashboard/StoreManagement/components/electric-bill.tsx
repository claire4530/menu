import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from "@/components/ui/button"
import { CircleDollarSign } from 'lucide-react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

interface PowerUsage {
    id: number
    powerName: string
    powerTime: string
    watt: number
}

const ElectricityBill : React.FC = () => {

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()
    const [selectedTimeFrame, setSelectedTimeFrame] = React.useState('dayUsage')

    const handleChangeTimeFrame = (value: string) => {
        setSelectedTimeFrame(value)
    }

    const [powerUsageData, setPowerUsageData] = useState<PowerUsage[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/power-usage`);
            const result = await response.json();

            setPowerUsageData(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const calculateElectricityBill = (kWh: number, isSummer: boolean) => {
        const summerRates = [
            { threshold: 120, rate: 1.68 },
            { threshold: 330, rate: 2.45 },
            { threshold: 500, rate: 3.70 },
            { threshold: 700, rate: 5.04 },
            { threshold: 1000, rate: 6.24 },
            { threshold: Infinity, rate: 8.46 },
        ];

        const nonSummerRates = [
            { threshold: 120, rate: 1.68 },
            { threshold: 330, rate: 2.16 },
            { threshold: 500, rate: 3.03 },
            { threshold: 700, rate: 4.14 },
            { threshold: 1000, rate: 5.07 },
            { threshold: Infinity, rate: 6.63 },
        ];

        const rates = isSummer ? summerRates : nonSummerRates;
        let bill = 0;
        let previousThreshold = 0;

        for (const { threshold, rate } of rates) {
            const usageInThisBracket = Math.min(kWh, threshold) - previousThreshold;
            if (usageInThisBracket > 0) {
                bill += usageInThisBracket * rate;
                previousThreshold = threshold;
            }
            if (kWh <= threshold) break;
        }

        return bill.toFixed(2);
    };

    const calculateTotalWatt = (timeFrame: string) => {
        const filteredData = powerUsageData.filter(item => {
            if (timeFrame === 'dayUsage') {
                return dayjs(item.powerTime).isSame(dayjs(), 'day');
            } else if (timeFrame === 'monthUsage') {
                return dayjs(item.powerTime).isSame(dayjs(), 'month');
            } else if (timeFrame === 'yearUsage') {
                return dayjs(item.powerTime).isSame(dayjs(), 'year');
            }
            return false;
        });

        const totalWatt = filteredData.reduce((total, item) => total + item.watt, 0);
        const totalKWh = totalWatt / 1000; // 將瓦特轉換為千瓦時
        const isSummer = dayjs().isBetween(dayjs('06-01'), dayjs('09-30'), null, '[]'); // 判斷是否為夏季
        const totalCost = calculateElectricityBill(totalKWh, isSummer);

        return totalCost;
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次資料

        return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium ">
                    <Select onValueChange={handleChangeTimeFrame} defaultValue="dayUsage">
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="本日總用電量" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="dayUsage">
                                    本日總用電費
                                </SelectItem>
                                <SelectItem value="monthUsage">
                                    本月總用電費
                                    <span className="text-xs">
                                        &nbsp;&nbsp;{currentMonth}月
                                    </span>
                                </SelectItem>
                                <SelectItem value="yearUsage">
                                    本年總用電費
                                    <span className="text-xs">
                                        &nbsp;&nbsp;{currentYear}年
                                    </span>
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardTitle>
                <CircleDollarSign className="h-8 w-8 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <div className="mt-2 font-bold text-4xl">
                    <span>&nbsp;&nbsp;{calculateTotalWatt(selectedTimeFrame)} </span>
                    <span className="font-bold text-lg mt-3 text-muted-foreground">元</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default ElectricityBill
