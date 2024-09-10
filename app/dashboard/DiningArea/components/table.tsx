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
import OrderDetails from './order-details'
import { CookingPot } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Notify from './notify'
import EditRemark from './edit-remark'
import FormMenu from './form'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import dayjs from 'dayjs'

interface OrderDetailsProps {
    tableNumber: string
    orderTime: string
}
interface TableProps {
    id: number
    state: string
    orderNumber: string
    startTime: string
    remainingMealTime: number
    totalMealTime: number
    tableNumber: string
    seats: number
    areas_id: number
    notify: string
    remark: string
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

const Table: React.FC<TableProps & { fetchTableData: () => void }> = ({
    state,
    orderNumber,
    startTime,
    remainingMealTime,
    totalMealTime,
    tableNumber,
    seats,
    areas_id,
    notify,
    remark,
}) => {

    const [cookerProps, setCookers] = useState<PaymentFire[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/cooker`);
            const result = await response.json();
            setCookers(result);
            console.log('cookerProps:', cookerProps);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const cookers = (Array.isArray(cookerProps) ? cookerProps : []).filter(
        (fireItem) => fireItem.tableNumber === tableNumber
    );

    const updateTableState = async (tableNumber: string, newState: string) => {
        try {
            const response = await fetch(`${apiUrl}/api/edit-table-state`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableNumber, newState }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error updating table state:', error);
        }
    };

    const updateTableRemark = async (tableNumber: string, remark: string) => {
        try {
            const response = await fetch(`${apiUrl}/api/edit-table-remark`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableNumber, remark }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error updating table state:', error);
        }
    };

    const updateAllCookerState = async (tableNumber: string, newState: string) => {
        try {
            const response = await fetch(`${apiUrl}/api/edit-all-cooker-state`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableNumber, newState }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
                fetchData();
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error updating all cooker state:', error);
        }
    };

    const changeAllCookerState = (tableNumber: string) => {
        updateAllCookerState(tableNumber, '關閉');
    };

    const changeState = (tableNumber: string) => {
        if (state === '用餐中') {
            updateTableState(tableNumber, '清潔中');
        } else if (state === '清潔中') {
            updateTableState(tableNumber, '空桌');
        } else if (state === '空桌') {
            updateTableState(tableNumber, '已預定');
        } else if (state === '已預定') {
            updateTableState(tableNumber, '空桌');
            updateTableRemark(tableNumber, "")
        }
    };

    const [orderCount, setOrderCount] = useState(0); // 訂單數量

    const OrderDetailsData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/order-details`);
            const result = await response.json();

            // 獲取當前日期
            const currentDate = dayjs().format('YYYY-MM-DD');

            // 過濾出本日且符合指定桌號的訂單
            const filteredOrders = result.filter((item: OrderDetailsProps) => {
                const isToday = dayjs(item.orderTime).format('YYYY-MM-DD') === currentDate;
                const isSameTable = item.tableNumber === tableNumber;
                return isToday && isSameTable;
            });

             // 設置訂單數量
            const orderCount = filteredOrders.length;
            const totalMealTime = orderCount * remainingMealTime;

            await updateTableTotalMealTime(tableNumber, totalMealTime);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const updateTableTotalMealTime = async (tableNumber: string, totalMealTime: number) => {
        try {
            const response = await fetch(`${apiUrl}/api/edit-table-all-meal-time`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableNumber, totalMealTime }),
            });

            const result = await response.json();
            if (response.ok) {
                console.log(result.message);
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error updating table state:', error);
        }
    };

    const [remainingTime, setRemainingTime] = useState(remainingMealTime);

    useEffect(() => {
        const interval = setInterval(() => {
            // 計算已經過的時間（以分鐘為單位）
            const now = dayjs();
            const start = dayjs(startTime);
            const elapsedMinutes = now.diff(start, 'minute');

            // 計算剩餘時間
            const updatedRemainingTime = remainingMealTime - elapsedMinutes;

            // 如果剩餘時間小於或等於 0，顯示 0，否則顯示剩餘時間
            setRemainingTime(Math.max(updatedRemainingTime, 0));
        }, 1000); // 每秒更新一次

        return () => clearInterval(interval); // 組件卸載時清除定時器
    }, [startTime, remainingMealTime]);

    useEffect(() => {
        OrderDetailsData();
    }, []);

    useEffect(() => {
        fetchData(); // 初始加载数据
        const interval = setInterval(fetchData, 1000); 

        return () => clearInterval(interval); 
    }, []);

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
                                        {tableNumber}{' '}
                                        <span className="text-base ml-2">
                                            ({seats}人座)
                                        </span>
                                    </CardTitle>
                                    <Notify tableNumber={tableNumber} areas_id={areas_id} state={notify} />
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
                                                剩餘用餐時間:&nbsp;{remainingTime}
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
                                    ) : (
                                        <>
                                            <div>訂單編號: --</div>
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
                                    )}
                                </div>
                                <div className="flex items-center justify-between space-y-12">
                                    {state === '用餐中' && (
                                        <>
                                            <div className="flex flex-col gap-7">
                                                用餐人數:{' 4人'}
                                                <OrderDetails orderNumber={orderNumber}>
                                                    <Button variant="outline">
                                                        訂單明細
                                                    </Button>
                                                </OrderDetails>
                                            </div>
                                        </>
                                    )}
                                    {state === '已預定' && (
                                        <>
                                            <div className="flex flex-col gap-7">
                                                <div>備註:&nbsp;{remark}</div>
                                                <EditRemark tableNumber={tableNumber} remark={remark}>
                                                    <Button variant="outline" className=''>
                                                        輸入預定資料
                                                    </Button>
                                                </EditRemark>
                                            </div>
                                        </>
                                    )}
                                    {state === '空桌' && (
                                        <>
                                            <div className="flex flex-col gap-7">
                                                <EditRemark tableNumber={tableNumber} remark={remark}>
                                                    <Button variant="outline" className='' onClick={() => changeState(tableNumber)}>
                                                        預定
                                                    </Button>
                                                </EditRemark>
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
                            <CardTitle>
                                {tableNumber}
                                <span className="text-base ml-2">
                                    &nbsp;({seats}人座)
                                </span>{' '}
                            </CardTitle>
                            <CardDescription>查看電磁爐狀態</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[240px] flex flex-col justify-between">
                            <div className="space-y-5">
                                {cookers.map((item, index) => (
                                    <Cooker
                                        key={index}
                                        {...item}
                                        index={index}
                                        databaseFireStatus={item.fireStatus}
                                        databaseState={item.state}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between">
                                <div className="space-y-5">
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
                                                            {cookers.map((item, index) => item.broken === 1 && (
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
                                                            {cookers.every((item) => item.broken !== 1 ) && (
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
                                    type="button"
                                    className="mr-4"
                                    onClick={() => changeAllCookerState(tableNumber) }
                                >
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
