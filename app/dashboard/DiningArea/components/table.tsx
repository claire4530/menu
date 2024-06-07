"use client"

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from "@/components/ui/separator"
import { BellIcon, BellAlertIcon } from '@heroicons/react/24/outline'
import React, { useState } from "react"
import Cooker from './cooker'
import OrderDetails from './order-details'
import { CookingPot } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

interface TableProps {
    state: string
    orderNumber: string
    remainingMealTime: number
    totalMealTime: number
    tableNumber: string
    seats: number
}

export type PaymentFire = {
    cookerNumber: number
    state: '關閉' | '開啟' | '錯誤'
    tableNumber: string
    fireStatus: number
    error: string
    reason: string
    solution: string
}

///////////////////////////////
// 用 tableNumber fetch 對應的 dataFire 資料
const dataFire: PaymentFire[] = [
    {
        cookerNumber: 1,
        state: '錯誤',
        tableNumber: '第一桌',
        fireStatus: 1,
        error: 'xF000000',
        reason: '空燒',
        solution: '關閉電磁爐電源',
    },
    {
        cookerNumber: 2,
        state: '關閉',
        tableNumber: '第一桌',
        fireStatus: 1,
        error: '/',
        reason: '/',
        solution: '/',
    },
    {
        cookerNumber: 1,
        state: '開啟',
        tableNumber: '第九桌',
        fireStatus: 1,
        error: '/',
        reason: '/',
        solution: '/',
    },
    {
        cookerNumber: 3,
        state: '開啟',
        tableNumber: '第一桌',
        fireStatus: 5,
        error: '/',
        reason: '/',
        solution: '/',
    },
    {
        cookerNumber: 1,
        state: '錯誤',
        tableNumber: '第八桌',
        fireStatus: 5,
        error: 'xF000000',
        reason: '空燒',
        solution: '關閉電磁爐電源',
    },
    {
        cookerNumber: 2,
        state: '錯誤',
        tableNumber: '第八桌',
        fireStatus: 5,
        error: 'xF000000',
        reason: '空燒',
        solution: '關閉電磁爐電源',
    },
    {
        cookerNumber: 3,
        state: '錯誤',
        tableNumber: '第八桌',
        fireStatus: 5,
        error: 'xF000000',
        reason: '空燒',
        solution: '關閉電磁爐電源',
    },
    {
        cookerNumber: 4,
        state: '錯誤',
        tableNumber: '第八桌',
        fireStatus: 5,
        error: 'xF000000',
        reason: '空燒',
        solution: '關閉電磁爐電源',
    },
    {
        cookerNumber: 1,
        state: '錯誤',
        tableNumber: '第十桌',
        fireStatus: 5,
        error: 'xF000000',
        reason: '空燒',
        solution: '關閉電磁爐電源',
    },
    {
        cookerNumber: 4,
        state: '錯誤',
        tableNumber: '第一桌',
        fireStatus: 1,
        error: 'xF000000',
        reason: '空燒',
        solution: '關閉電磁爐電源',
    },
    {
        cookerNumber: 1,
        state: '開啟',
        tableNumber: '第二桌',
        fireStatus: 1,
        error: '/',
        reason: '/',
        solution: '/',
    },
    {
        cookerNumber: 2,
        state: '開啟',
        tableNumber: '第二桌',
        fireStatus: 1,
        error: '/',
        reason: '/',
        solution: '/',
    },
    {
        cookerNumber: 3,
        state: '開啟',
        tableNumber: '第二桌',
        fireStatus: 1,
        error: '/',
        reason: '/',
        solution: '/',
    },
    {
        cookerNumber: 4,
        state: '關閉',
        tableNumber: '第二桌',
        fireStatus: 1,
        error: '/',
        reason: '/',
        solution: '/',
    },
]
///////////////////////////////

const Table: React.FC<TableProps> = ({
    state,
    orderNumber,
    remainingMealTime,
    totalMealTime,
    tableNumber,
    seats,
}) => {
    // fetch
    const cookers = dataFire.filter(
        (fireItem) => fireItem.tableNumber === tableNumber,
    )

    const changeAllCookerState = () => {
        // 改資料庫
        for (let i = 0; i < cookers.length; i++) {
            cookers[i].state = "關閉";
        }
        // 改cooker state狀態
    }

    const changeState = () => {
        // 改資料庫
        
    }

    return (
        <div className="w-full">
            <Tabs defaultValue="account" className="h-fit">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">用餐詳情</TabsTrigger>
                    <TabsTrigger value="password">電磁爐狀態</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="h-fit">
                    <Card className="h-fit">
                        <div className="h-full">
                            <CardHeader className="flex space-y-1 pr-4 pt-4 h-[124px]">
                                <div className="flex items-center">
                                    <CardTitle className="w-80">
                                        {tableNumber} <span className='text-base ml-2'>({seats}人座)</span> 
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        className="h-14 w-14 rounded-full"
                                    >
                                        <BellIcon className="flex-end h-6 w-6" />
                                    </Button>
                                </div>
                                <CardDescription className="text-base text-black">
                                    狀態: {state}
                                
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex h-[235px] flex-col justify-between">
                                <div className="flex flex-col gap-4">
                                    <div>訂單編號: {orderNumber}</div>
                                    <div className="flex items-baseline gap-2">
                                        剩餘用餐時間: {remainingMealTime}
                                        <span className="text-xs font-bold">
                                            min
                                        </span>
                                    </div>
                                    <div>
                                        本日總用餐時間:{' '}
                                        {Math.floor(totalMealTime / 60)}{' '}
                                        <span className="text-xs font-bold">
                                            h&nbsp;
                                        </span>
                                        {totalMealTime % 60}{' '}
                                        <span className="text-xs font-bold">
                                            min
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between space-y-12">
                                    {state === '用餐中' && (
                                        <>
                                        <div className='flex flex-col gap-7'>
                                            用餐人數:{' 4人'}
                                            <OrderDetails>
                                                <Button variant="outline">
                                                    訂單明細
                                                </Button>
                                            </OrderDetails>
                                        </div>    
                                        </>                                 
                                    )}
                                    {state === '已預定' && (
                                        <>
                                        <div className='flex flex-col gap-7'>
                                            用餐人數:{' 4人'}
                                            <Button variant="outline">
                                                修改人數
                                            </Button>
                                        </div>    
                                        </>                                 
                                    )}                                    
                                    <Button
                                        variant="outline"
                                        className="ml-auto px-6"
                                        onClick={changeState}
                                    >
                                        {state === '用餐中'
                                            ? '結帳'
                                            : state === '清潔中'
                                            ? '清潔完成'
                                            : state === '空桌'
                                            ? '預定'
                                            : state === '已預定'
                                            ? '取消預定'
                                            : ''}
                                    </Button>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                </TabsContent>
                <TabsContent value="password" className="h-fit">
                    <Card className="h-fit">
                        <CardHeader className="space-y-5 pt-8 h-[120x]">
                            <CardTitle>{tableNumber}<span className='text-base ml-2'>&nbsp;({seats}人座)</span> </CardTitle>
                            <CardDescription>查看電磁爐狀態</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[239px] flex flex-col justify-between">
                            <div className='space-y-5'>
                                {cookers.map((item, index) => (
                                    <Cooker key={index} {...item} />
                                ))}
                            </div>
                            <div className='flex justify-between'>
                                <div className='space-y-5'>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                        >
                                            查看錯誤訊息
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[480px]">
                                        <DialogHeader>
                                            <DialogTitle></DialogTitle>
                                            <DialogDescription>
                                            <ScrollArea className="h-[320px] w-[450px] p-4">
                                                <div>
                                                    {cookers.map((item, index) => (
                                                        item.state === '錯誤' && (
                                                            <div key={index}>
                                                                <div className="gap-2 font-bold justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                                                                    <CookingPot />
                                                                    {item.cookerNumber}號電磁爐
                                                                </div>
                                                                <div className="justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                                                                    電磁爐錯誤代碼：{item.error}
                                                                </div>
                                                                <div className="justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                                                                    可能原因：{item.reason}
                                                                </div>
                                                                <div className="justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                                                                    處理方法：{item.solution}
                                                                </div>
                                                                <Separator/>
                                                            </div>
                                                        )
                                                    ))}
                                                    {cookers.every(item => item.state !== '錯誤') && (
                                                        <div className="text-center">沒有錯誤訊息</div>
                                                    )}
                                                </div>
                                            </ScrollArea>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>    
                                </div>     
                                    <Button type="button" className="mr-4" onClick={changeAllCookerState} >
                                        一鍵關閉
                                    </Button>                                 
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Table
