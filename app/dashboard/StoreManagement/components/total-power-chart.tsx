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
import { OverviewYear, OverviewMonth, OverviewDay} from './overview-power'

const TotalPowerChart : React.FC = () => {

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
                    <SelectTrigger className="ml-4 w-[200px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="dayMoney">
                            本日總用電量
                        </SelectItem>
                        <SelectItem value="monthMoney">
                            本月總用電量
                            <span className="text-xs">
                                &nbsp;&nbsp;{currentMonth}月
                            </span>
                        </SelectItem>
                        <SelectItem value="yearMoney">
                            本年總用電量
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

export default TotalPowerChart