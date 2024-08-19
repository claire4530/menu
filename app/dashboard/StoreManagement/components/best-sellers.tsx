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
    RecentSalesMonth,
    RecentSalesDay,
    RecentSalesYear,
} from './recent-sales'

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

const BestSellers : React.FC = () => {

    const currentDate = new Date()
    // 獲取當前月份
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()

    const [selectedPeople, setselectedPeople] = React.useState('dayPeople')
    const handleChangePeople = (value: string) => {
        setselectedPeople(value)
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
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>暢銷商品</CardTitle>
            </CardHeader>
            <CardContent>
                <Select
                    onValueChange={handleChangePeople}
                    defaultValue="dayPeople"
                >
                    <SelectTrigger className="ml-4 w-[240px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="dayPeople">
                            本日出售率前十商品
                        </SelectItem>
                        <SelectItem value="monthPeople">
                            本月出售率前十商品
                            <span className="text-xs">
                                &nbsp;&nbsp;{currentMonth}月
                            </span>
                        </SelectItem>
                        <SelectItem value="yearPeople">
                            本年出售率前十商品
                            <span className="text-xs">
                                &nbsp;&nbsp;{currentYear}年
                            </span>
                        </SelectItem>
                    </SelectContent>
                </Select>
                {selectedPeople === 'dayPeople' && (
                    <div className="pt-8">
                        <RecentSalesDay />
                    </div>
                )}
                {selectedPeople === 'monthPeople' && (
                    <div className="pt-8">
                        <RecentSalesMonth />
                    </div>
                )}
                {selectedPeople === 'yearPeople' && (
                    <div className="pt-8">
                        <RecentSalesYear />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default BestSellers