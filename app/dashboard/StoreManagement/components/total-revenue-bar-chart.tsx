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
import {
    OverviewYear,
    OverviewMonth,
    OverviewDay,
} from '@/app/dashboard/StoreManagement/components/overview'

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

const TotalRevenueBarChart : React.FC = () => {

    const currentDate = new Date()
    // 獲取當前月份
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()

    const [selectedCharts, setSelectedCharts] = React.useState('dayMoney')
    const handleChangeCharts = (value: string) => {
        setSelectedCharts(value)
    }

    // const [moneyProps, setMoney] = useState<Area[]>([]);
    // const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch(`${apiUrl}/api/order-details`);
    //         const result = await response.json();
    //         setMoney(result);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData()
    // }, [])
    
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>銷售成長</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <Select
                    onValueChange={handleChangeCharts}
                    defaultValue="dayMoney"
                >
                    <SelectTrigger className="ml-4 w-[200px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
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
                    </SelectContent>
                </Select>
                {selectedCharts === 'dayMoney' && (
                    <div className="pt-8">
                        <OverviewDay />
                    </div>
                )}
                {selectedCharts === 'monthMoney' && (
                    <div className="pt-8">
                        <OverviewMonth />
                    </div>
                )}
                {selectedCharts === 'yearMoney' && (
                    <div className="pt-8">
                        <OverviewYear />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default TotalRevenueBarChart