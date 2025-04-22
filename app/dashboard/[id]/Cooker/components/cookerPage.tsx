'use client'

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
import { Separator } from '@/components/ui/separator'
import { BellIcon, BellAlertIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import Cooker from './cooker'
import { CookingPot } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

interface OrderDetailsProps {
    tableNumber: string
    orderTime: string
}

interface Areas {
    tableNumber: string;
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
    id: string
}

const Table: React.FC<{ id: string }> = ({ id }) => {
    
    const decodedId = Array.isArray(id) ? id.map(decodeURIComponent).join(', ') : decodeURIComponent(id);
    const [cookerProps, setCookers] = useState<PaymentFire[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/cooker`)
            if (!response.ok) throw new Error('Failed to fetch data')
            const result: PaymentFire[] = await response.json()
            // 過濾出 tableNumber 與傳入的 id 相同的 cookers
            const filteredCookers = result.filter(
                (item) => item.tableNumber === decodedId
            )
            setCookers(filteredCookers)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    // const cookers = (Array.isArray(cookerProps) ? cookerProps : []).filter(
    //     (fireItem) => fireItem.tableNumber === tableNumber
    // );

    const updateAllCookerState = async (tableNumber: string, newState: string) => {
        try {
            const response = await fetch(`${apiUrl}/api/edit-all-cooker-state`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableNumber, newState }),
            });
        } catch (error) {
            console.error('Error updating all cooker state:', error);
        }
    };

    const changeAllCookerState = (tableNumber: string) => {
        updateAllCookerState(tableNumber, '關閉');
    };

    useEffect(() => {
        fetchData(); // 初始加载数据
        const interval = setInterval(fetchData, 1000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <div className="w-full">
            <Card>
                <div className="h-[380px] ">
                    <CardHeader className="flex gap-2">
                        <div className="flex items-center h-[56px]">
                            <CardTitle className="w-80">
                                {decodedId}
                            </CardTitle>
                        </div>
                        <CardDescription>查看電磁爐狀態</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[240px] flex flex-col justify-between">
                        <div className="space-y-5">
                            {cookerProps.map((item, index) => (
                                <Cooker
                                    key={index}
                                    {...item}
                                    index={index}
                                    databaseFireStatus={item.fireStatus}
                                    databaseState={item.state}
                                />
                            ))}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="">
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
                                                        {cookerProps.map((item, index) => item.broken === 1 && (
                                                            <div key={ index }>
                                                                <div className="gap-2 font-bold justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                                                                    <CookingPot />
                                                                    {index + 1}號電磁爐
                                                                </div>
                                                                <div className="justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                                                                    電磁爐錯誤代碼：{ item.error }
                                                                </div>
                                                                <div className="justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                                                                    可能原因：{ item.reason }
                                                                </div>
                                                                <div className="justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                                                                    處理方法：{ item.solution }
                                                                </div>
                                                                <Separator />
                                                            </div>
                                                            )
                                                        )}
                                                        {cookerProps.every((item) => item.broken !== 1 ) && (
                                                            <div className="text-center">
                                                                沒有錯誤訊息
                                                            </div>
                                                        )}
                                                    </div>
                                                </ScrollArea>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <Button
                                variant="outline"
                                className="ml-auto px-6 py-2 bg-[#bf6c41] text-white font-semibold hover:bg-[#8d4a28] hover:text-white"
                                onClick={() => changeAllCookerState(decodedId) }
                            >
                                一鍵關閉
                            </Button>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}

export default Table