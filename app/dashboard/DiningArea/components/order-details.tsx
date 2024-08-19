import { ReactNode } from 'react'
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
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ children }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>訂單明細</DialogTitle>
                    <DialogDescription>
                        <br />
                        開始用餐時間: {new Date().toLocaleString()} <br />
                        &nbsp;
                        <br />
                        石頭鍋 239元 x1
                        <br />
                        石頭鍋 239元 x1
                        <br />
                        石頭鍋 239元 x1
                        <br />
                        石頭鍋 239元 x1
                        <br />
                        &nbsp;
                        <br />
                        總計:2000元
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit">修改訂單</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default OrderDetails
