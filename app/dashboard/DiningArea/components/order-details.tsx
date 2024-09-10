import { ReactNode } from 'react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface OrderDetailsProps {
    children: ReactNode
    orderNumber: string
}

interface Area {
    id: number
    orderTime: string
    content: string
    payment: number
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ children, orderNumber }) => {

    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleString();
    };
    const [cookerProps, setCookers] = useState<Area[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/order-details`);
            const result = await response.json();
            const data = result.filter((item: { orderNumber: string }) => item.orderNumber === orderNumber);
            setCookers(data);
            console.log('cookerProps:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // 初始加载数据
        const interval = setInterval(fetchData, 1000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className='space-y-6'>
                    <DialogTitle>訂單明細</DialogTitle>
                    <DialogDescription>
                        {cookerProps.length > 0 ? (
                            cookerProps.map((order) => (
                                <div key={order.id} className='flex flex-col gap-4'>
                                    <div>開始用餐時間: {formatDate(order.orderTime)}</div>
                                    <div>內容: {order.content}</div>
                                    <div>總計: {order.payment} 元</div>
                                </div>
                            ))
                        ) : (
                            <p>沒有找到相關訂單。</p>
                        )}
                    </DialogDescription>
                </DialogHeader>
                {/* <DialogFooter>
                    <Button type="submit">修改訂單</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}

export default OrderDetails
