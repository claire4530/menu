import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
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
import { CarbonDay, CarbonMonth, CarbonYear } from './carbon'

interface Area {
    id: number
    orderTime: string
    daily_revenue: number
    monthly_revenue: number
    yearly_revenue: number
}

const CarbonAnalysis : React.FC = () => {

    const currentDate = new Date()
    // 獲取當前月份
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()

    const [selectedPeople, setselectedPeople] = React.useState('dayPeople')
    const handleChangePeople = (value: string) => {
        setselectedPeople(value)
    }
    
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
                            本日碳排放分析
                        </SelectItem>
                        <SelectItem value="monthPeople">
                            本月碳排放分析
                            <span className="text-xs">
                                &nbsp;&nbsp;{currentMonth}月
                            </span>
                        </SelectItem>
                        <SelectItem value="yearPeople">
                            本年碳排放分析
                            <span className="text-xs">
                                &nbsp;&nbsp;{currentYear}年
                            </span>
                        </SelectItem>
                    </SelectContent>
                </Select>
                {selectedPeople === 'dayPeople' && (
                    <div className="pt-8">
                        <CarbonDay />
                    </div>
                )}
                {selectedPeople === 'monthPeople' && (
                    <div className="pt-8">
                        <CarbonMonth />
                    </div>
                )}
                {selectedPeople === 'yearPeople' && (
                    <div className="pt-8">
                        <CarbonYear />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default CarbonAnalysis