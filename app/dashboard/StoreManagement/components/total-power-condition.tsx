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
import {RecentPowerDay, RecentPowerMonth, RecentPowerYear} from './sort-power-usage'

const TotalPowerCondition : React.FC = () => {

    const currentDate = new Date()
    // 獲取當前月份
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()

    const [selectedCharts, setSelectedCharts] = React.useState('dayMoney')
    const handleChangeCharts = (value: string) => {
        setSelectedCharts(value)
    }
    
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>用電成長</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <Select
                    onValueChange={handleChangeCharts}
                    defaultValue="dayMoney"
                >
                    <SelectTrigger className="ml-4 w-[220px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="dayMoney">
                            本日用電量前五電器
                        </SelectItem>
                        <SelectItem value="monthMoney">
                            本月用電量前五電器
                            <span className="text-xs">
                                &nbsp;&nbsp;{currentMonth}月
                            </span>
                        </SelectItem>
                        <SelectItem value="yearMoney">
                            本年用電量前五電器
                            <span className="text-xs">
                                &nbsp;&nbsp;{currentYear}年
                            </span>
                        </SelectItem>
                    </SelectContent>
                </Select>
                {selectedCharts === 'dayMoney' && (
                    <div className="pt-8">
                        <RecentPowerDay />
                    </div>
                )}
                {selectedCharts === 'monthMoney' && (
                    <div className="pt-8">
                        <RecentPowerMonth />
                    </div>
                )}
                {selectedCharts === 'yearMoney' && (
                    <div className="pt-8">
                        <RecentPowerYear />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default TotalPowerCondition