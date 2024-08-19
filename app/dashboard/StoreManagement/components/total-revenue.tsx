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

interface Area {
    id: number
    orderTime: string
    daily_revenue: number
    monthly_revenue: number
    yearly_revenue: number
}

// async function editState(id: number, state: string, stateButton: string): Promise<void> {

//     const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
//     await fetch(`${apiUrl}/api/edit-notify-state`,
//         {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ id, state, stateButton }),
//         }
//     )
// }

const TotalRevenue : React.FC = () => {

    const currentDate = new Date()
    // 獲取當前月份
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()
    const [selectedMoney, setSelectedMoney] = React.useState('dayMoney')
    
    const handleChangeMoney = (value: string) => {
        setSelectedMoney(value)
    }

    const [moneyProps, setMoney] = useState<Area[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/business-revenue`);
            const result = await response.json();

            const currentDate = dayjs().format('YYYY-MM-DD');
            const filteredData = result.filter((item: { date: string }) => {
                return dayjs(item.date).format('YYYY-MM-DD') === currentDate;
            });
    
            setMoney(filteredData);

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
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium ">
                    <Select onValueChange={handleChangeMoney} defaultValue="dayMoney">
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="本月總營業額" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="dayMoney">
                                    本日總營業額
                                </SelectItem>
                                <SelectItem value="monthMoney">
                                    本月總營業額
                                    <span className="text-xs">
                                        &nbsp;&nbsp;{currentMonth}月
                                    </span>
                                </SelectItem>
                                <SelectItem value="yearMoney">
                                    本年總營業額
                                    <span className="text-xs">
                                        &nbsp;&nbsp;{currentYear}年
                                    </span>
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardTitle>
                <CircleDollarSign className="h-6 w-6 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                {selectedMoney === 'dayMoney' && (
                    <>
                        {moneyProps.map((money) => (
                            <div key={money.id} className="mt-2 font-bold text-4xl">
                                <p>$ {money.daily_revenue}</p>
                            </div>
                        ))}
                        {/* <p className="mt-2 text-xs text-muted-foreground">
                            +20.1% from yesterday
                        </p> */}
                    </>
                )}
                {selectedMoney === 'monthMoney' && (
                    <>
                        {moneyProps.map((money) => (
                            <div key={money.id} className="mt-2 font-bold text-4xl">
                                <p>$ {money.monthly_revenue}</p>
                            </div>
                        ))}
                        {/* <p className="mt-2 text-xs text-muted-foreground">
                            +20.1% from last month
                        </p> */}
                    </>
                )}
                {selectedMoney === 'yearMoney' && (
                    <>
                        {moneyProps.map((money) => (
                            <div key={money.id} className="mt-2 font-bold text-4xl">
                                <p>$ {money.yearly_revenue}</p>
                            </div>
                        ))}
                        {/* <p className="mt-2 text-xs text-muted-foreground">
                            +20.1% from last year
                        </p> */}
                    </>
                )}
            </CardContent>
        </Card>
    )
}

export default TotalRevenue