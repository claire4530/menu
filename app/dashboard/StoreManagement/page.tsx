'use client'
import Image from 'next/image'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
import { RecentSalesMonth,RecentSalesDay,RecentSalesYear } from '@/app/dashboard/StoreManagement/components/recent-sales'
import { ResponsiveTimePickers } from '@/app/dashboard/StoreManagement/components/time'

import {
    OverviewLineChartMonth,
    OverviewLineChartDay,
    OverviewLineChartYear,
} from '@/app/dashboard/StoreManagement/components/overviewLineChart'
import { 
    DevicePowerDay,
    DevicePowerMonth,
    DevicePowerYear
 } from '@/app/dashboard/StoreManagement/components/devicePower'
import { ClockIcon } from '@heroicons/react/24/outline'
import {YourComponent} from "./components/notifyTime"
import {
    CarbonDay,
    CarbonMonth,
    CarbonYear
} from "./components/carbon"

export default function DashboardPage() {
    //營業額
    const [selectedMoney, setSelectedMoney] = React.useState('dayMoney')
    const handleChangeMoney = (value: string) => {
        setSelectedMoney(value)
    }
    //人流量
    const [selectedPeople, setSelectedPeople] = React.useState('dayPeople')

    const handleChangePeople = (value: string) => {
        setSelectedPeople(value)
    }
    //圖表
    const [selectedCharts, setSelectedCharts] = React.useState('dayMoney')

    const handleChangeCharts = (value: string) => {
        setSelectedCharts(value)
        
    }
    const [selectedChartsCarbon, setSelectedChartsCarbon] = React.useState('CarbonDay')

    const handleChangeChartsCarbon = (value: string) => {
        setSelectedChartsCarbon(value)
        
    }

    const [selectedChartsPower, setSelectedChartsPower] = React.useState('devicePowerDay')

    const handleChangeChartsPower = (value: string) => {
        setSelectedChartsPower(value)
        
    }
    // 獲取當前日期
    const currentDate = new Date()
    // 獲取當前月份
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear();
    return (
        <>
            {/* <div className="md:hidden">
                <Image
                    src="/examples/dashboard-light.png"
                    width={1280}
                    height={866}
                    alt="Dashboard"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/dashboard-dark.png"
                    width={1280}
                    height={866}
                    alt="Dashboard"
                    className="hidden dark:block"
                />
            </div> */}
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <h2 className="text-3xl font-bold tracking-tight">
                            店鋪管理
                        </h2>
                    </div>
                </div>
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                    </div>
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="overview">營業管理</TabsTrigger>
                            <TabsTrigger value="analytics">
                                用電量管理
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-3">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between  pb-2">
                                        <CardTitle className="text-sm font-medium ">
                                            <Select
                                                onValueChange={
                                                    handleChangeMoney
                                                }
                                                defaultValue="dayMoney"
                                            >
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
                                                                {' '}
                                                                &nbsp;{currentMonth}月
                                                            </span>
                                                        </SelectItem>
                                                        <SelectItem value="yearMoney">
                                                            本年總營業額
                                                            <span className="text-xs">
                                                                {' '}
                                                                &nbsp;{currentYear}年
                                                            </span>
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        {selectedMoney === 'dayMoney' && (
                                            <>
                                                <div className="mt-2 text-2xl font-bold">
                                                    $12,345
                                                </div>
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    +20.1% from yesterday
                                                </p>
                                            </>
                                        )}
                                        {selectedMoney === 'monthMoney' && (
                                            <>
                                                <div className="mt-2 text-2xl font-bold">
                                                    $54,321
                                                </div>
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    +20.1% from last month
                                                </p>
                                            </>
                                        )}
                                        {selectedMoney === 'yearMoney' && (
                                            <>
                                                <div className="mt-2 text-2xl font-bold">
                                                    $54,321,000
                                                </div>
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    +20.1% from last year
                                                </p>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                                        <CardTitle className="text-sm font-medium">
                                            用餐時間調整
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent className='mt-6'>
                                        <YourComponent></YourComponent>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            營業時間調整
                                        </CardTitle>
                                        <ClockIcon className="h-5 w-5"></ClockIcon>
                                    </CardHeader>
                                    <CardContent className="mt-4 flex gap-2">
                                        <ResponsiveTimePickers />
                                        <Button variant="default" className='mt-3 ml-2 w-16 h-10 text-sm'>確認</Button>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
                                                        {' '}
                                                        &nbsp;{currentMonth}月
                                                    </span>
                                                </SelectItem>
                                                <SelectItem value="yearMoney">
                                                    本年總營業額
                                                    <span className="text-xs">
                                                        {' '}
                                                        &nbsp;{currentYear}年
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
                                                    {' '}
                                                    &nbsp;{currentMonth}月
                                                </span>
                                            </SelectItem>
                                            <SelectItem value="yearPeople">
                                                本年出售率前十商品
                                                <span className="text-xs">
                                                    {' '}
                                                    &nbsp;{currentYear}年
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
                            </div>
                        </TabsContent>
                        <TabsContent value="analytics" className="space-y-4">
                            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-2">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between  pb-2">
                                        <CardTitle className="text-sm font-medium ">
                                            <Select
                                                onValueChange={
                                                    handleChangeMoney
                                                }
                                                defaultValue="dayMoney"
                                            >
                                                <SelectTrigger className="w-[200px]">
                                                    <SelectValue placeholder="本月總用電量" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {/* <SelectLabel>$總營業額</SelectLabel> */}
                                                        <SelectItem value="dayMoney">
                                                            本日總用電量
                                                        </SelectItem>
                                                        <SelectItem value="monthMoney">
                                                            本月總用電量
                                                            <span className="text-xs">
                                                                {' '}
                                                                &nbsp;{currentMonth}月
                                                            </span>
                                                        </SelectItem>
                                                        <SelectItem value="yearMoney">
                                                            本年總用電量
                                                            <span className="text-xs">
                                                                {' '}
                                                                &nbsp;{currentYear}年
                                                            </span>
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        {selectedMoney === 'dayMoney' && (
                                            <>
                                                <div className="mt-2 inline-block text-2xl font-bold">
                                                    12,345{' '}
                                                </div>
                                                <div className="ml-2 mt-2 inline-block text-lg font-medium">
                                                    kw
                                                </div>
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    +20.1% from yesterday
                                                </p>
                                            </>
                                        )}
                                        {selectedMoney === 'monthMoney' && (
                                            <>
                                                <div className="mt-2 inline-block text-2xl font-bold">
                                                    84,322
                                                </div>
                                                <div className="ml-2 mt-2 inline-block text-lg font-medium">
                                                    kw
                                                </div>
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    +20.1% from last month
                                                </p>
                                            </>
                                        )}
                                        {selectedMoney === 'yearMoney' && (
                                            <>
                                                <div className="mt-2 inline-block text-2xl font-bold">
                                                    121,000
                                                </div>
                                                <div className="ml-2 mt-2 inline-block text-lg font-medium">
                                                    kw
                                                </div>
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    +20.1% from last year
                                                </p>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-xl font-bold">
                                            <Select
                                                onValueChange={
                                                    handleChangePeople
                                                }
                                                defaultValue="dayPeople"
                                            >
                                                <SelectTrigger className="w-[200px] font-medium">
                                                    <SelectValue placeholder="" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {/* <SelectLabel>$總營業額</SelectLabel> */}
                                                        <SelectItem value="dayPeople">
                                                            本日總用電費
                                                        </SelectItem>
                                                        <SelectItem value="monthPeople">
                                                            本月總用電費
                                                            <span className="text-xs">
                                                                {' '}
                                                                &nbsp;{currentMonth}月
                                                            </span>
                                                        </SelectItem>
                                                        <SelectItem value="yearPeople">
                                                            本年總用電費
                                                            <span className="text-xs">
                                                                {' '}
                                                                &nbsp;{currentYear}年
                                                            </span>                                                            
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        {selectedPeople === 'dayPeople' && (
                                            <>
                                                <div className="mt-2 ml-2 text-2xl font-bold">
                                                    $ 120
                                                </div>
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    +20.1% from last month
                                                </p>
                                            </>
                                        )}
                                        {selectedPeople === 'monthPeople' && (
                                            <>
                                                <div className="mt-2 ml-2 text-2xl font-bold">
                                                    $ 1000
                                                </div>
                                                <p className="mt-2 ml-2 text-xs text-muted-foreground">
                                                    +20.1% from last month
                                                </p>
                                            </>
                                        )}
                                        {selectedPeople === 'yearPeople' && (
                                            <>
                                                <div className="mt-2 text-2xl font-bold">
                                                    $ 23840
                                                </div>
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    +20.1% from last month
                                                </p>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                                <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>用電統計</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        <Select
                                            onValueChange={handleChangeCharts}
                                            defaultValue="dayMoney"
                                        >
                                            <SelectTrigger className="ml-4 w-[200px] ">
                                                <SelectValue placeholder="Theme" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="dayMoney">
                                                    本日總用電量
                                                </SelectItem>
                                                <SelectItem value="monthMoney">
                                                    本月總用電量
                                                    <span className="text-xs">
                                                        {' '}
                                                        &nbsp;{currentMonth}月
                                                    </span>
                                                </SelectItem>
                                                <SelectItem value="yearMoney">
                                                    本年總用電量
                                                    <span className="text-xs">
                                                        {' '}
                                                        &nbsp;{currentYear}年
                                                    </span>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {selectedCharts === 'dayMoney' && (
                                            <div className="pt-8">
                                                <OverviewLineChartDay />
                                            </div>
                                        )}
                                        {selectedCharts === 'monthMoney' && (
                                            <div className="pt-8">
                                                <OverviewLineChartMonth />
                                            </div>
                                        )}
                                        {selectedCharts === 'yearMoney' && (
                                            <div className="pt-8">
                                                <OverviewLineChartYear />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>用電情況</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        <Select
                                            onValueChange={handleChangeChartsPower}
                                            defaultValue="devicePowerDay"
                                        >
                                            <SelectTrigger className="ml-4 w-[230px] ">
                                                <SelectValue placeholder="Theme" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="devicePowerDay">
                                                    本日用電量前五電器
                                                </SelectItem>
                                                <SelectItem value="devicePowerMonth">
                                                    本月用電量前五電器
                                                    <span className="text-xs">
                                                        {' '}
                                                        &nbsp;{currentMonth}月
                                                    </span>
                                                </SelectItem>
                                                <SelectItem value="devicePowerYear">
                                                    本年用電量前五電器
                                                    <span className="text-xs">
                                                        {' '}
                                                        &nbsp;{currentYear}年
                                                    </span>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {selectedChartsPower === 'devicePowerDay' && (
                                            <div className="pt-8">
                                                <DevicePowerDay />
                                            </div>
                                        )}
                                        {selectedChartsPower === 'devicePowerMonth' && (
                                            <div className="pt-8">
                                                <DevicePowerMonth />
                                            </div>
                                        )}
                                        {selectedChartsPower === 'devicePowerYear' && (
                                            <div className="pt-8">
                                                <DevicePowerYear />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                                <Card className="col-span-3">
                                    <CardHeader>
                                        <CardTitle>碳排放分析</CardTitle>
                                        <CardDescription className="pt-2">
                                            
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                    <Select
                                            onValueChange={handleChangeChartsCarbon}
                                            defaultValue="CarbonDay"
                                        >
                                            <SelectTrigger className="ml-4 w-[200px] ">
                                                <SelectValue placeholder="Theme" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="CarbonDay">
                                                    本日碳排放分析
                                                </SelectItem>
                                                <SelectItem value="CarbonMonth">
                                                    本月碳排放分析
                                                    <span className="text-xs">
                                                        {' '}
                                                        &nbsp;{currentMonth}月
                                                    </span>
                                                </SelectItem>
                                                <SelectItem value="CarbonYear">
                                                    本年碳排放分析
                                                    <span className="text-xs">
                                                        {' '}
                                                        &nbsp;{currentYear}年
                                                    </span>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {selectedChartsCarbon === 'CarbonDay' && (
                                            <div className="pt-8">
                                                <CarbonDay />
                                            </div>
                                        )}
                                        {selectedChartsCarbon === 'CarbonMonth' && (
                                            <div className="pt-8">
                                                <CarbonMonth />
                                            </div>
                                        )}
                                        {selectedChartsCarbon === 'CarbonYear' && (
                                            <div className="pt-8">
                                                <CarbonYear />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
