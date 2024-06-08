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
    id: number
    state: string
    orderNumber: string
    remainingMealTime: number
    totalMealTime: number
    tableNumber: string
    seats: number
}

export type PaymentFire = {
    cookerNumber: string
    state: '關閉' | '開啟' | '錯誤'
    tableNumber: string
    fireStatus: number
    error: string
    reason: string
    solution: string
    broken: number
}


async function updateTableState(tableNumber: string, newState: string): Promise<void> {

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const response: Response = await fetch(`${apiUrl}/api/edit-table-state`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tableNumber, newState })
    });

    const result: any = await response.json();
    if (response.ok) {
        console.log(result.message);
    } else {
        console.error(result.message);
    }
    

}

async function updateAllCookerState(tableNumber: string, newState: string): Promise<void> {

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const response: Response = await fetch(`${apiUrl}/api/edit-all-cooker-state`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tableNumber, newState })
    });

    const result: any = await response.json();
    if (response.ok) {
        console.log(result.message);
    } else {
        console.error(result.message);
    }
    

}

const Table: React.FC<TableProps> = async ({
    state,
    orderNumber,
    remainingMealTime,
    totalMealTime,
    tableNumber,
    seats,
}) => {
    // fetch


    const changeAllCookerState = (tableNumber: string) => {
        updateAllCookerState(tableNumber, "關閉");
    }
    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const cookerProps : PaymentFire[] = await fetch(`${apiUrl}/api/cooker`).then((res) => res.json());  

    const cookers = cookerProps.filter(
        (fireItem) => fireItem.tableNumber === tableNumber,
    )
    const changeState = (tableNumber: string) => {
        // 改資料庫
        console.log(state);
        if (state === '用餐中') {
            updateTableState(tableNumber, "清潔中");
            orderNumber = '';
        } else if (state === '清潔中') {
            updateTableState(tableNumber, "空桌");
        } else if (state === '空桌') {
            updateTableState(tableNumber, "已預定");
        } else if (state === '已預定') {
            updateTableState(tableNumber, "空桌");
        }
    }

    return (
        <div className="w-full">
            <Tabs defaultValue="account" className="h-fit w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">用餐詳情</TabsTrigger>
                    <TabsTrigger value="password">電磁爐狀態</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="h-fit w-[400px]">
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
                            <CardContent className="flex h-[240px] flex-col justify-between">
                                <div className="flex flex-col gap-4 text-sm ">
                                    {state === '用餐中' ? (
                                        <>
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
                                        </>                                 
                                    ):(
                                    <>
                                        <div>訂單編號: --</div>
                                        <div className="flex items-baseline gap-2">
                                            剩餘用餐時間: 120
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
                                        </> )}
                                </div>
                                <div className="flex items-center justify-between space-y-12">
                                    {state === '用餐中' && (
                                        <>
                                        <div className='flex flex-col gap-7'>
                                            用餐人數:{' 4人'}
                                            <OrderDetails>
                                                <Button variant="outline" >
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
                                        onClick={() => changeState(tableNumber)}
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
                <TabsContent value="password" className="h-fit w-[400px]">
                    <Card className="h-fit">
                        <CardHeader className="space-y-5 pt-8 h-[120px]">
                            <CardTitle>{tableNumber}<span className='text-base ml-2'>&nbsp;({seats}人座)</span> </CardTitle>
                            <CardDescription>查看電磁爐狀態</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[240px] flex flex-col justify-between">
                            <div className='space-y-5'>
                                {cookers.map((item, index) => (
                                    <Cooker key={index} {...item} index={index}/>

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
                                                        item.broken === 1 && (
                                                            <div key={index}>
                                                                <div className="gap-2 font-bold justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                                                                    <CookingPot />
                                                                    {index+1}號電磁爐
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
                                                    {cookers.every(item => item.broken !== 1) && (
                                                        <div className="text-center">沒有錯誤訊息</div>
                                                    )}
                                                </div>
                                            </ScrollArea>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>    
                                </div>     
                                    <Button type="button" className="mr-4" onClick={() => changeAllCookerState(tableNumber)} >
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
