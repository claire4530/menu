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
import { Textarea } from '@/components/ui/textarea'

interface OrderDetailsProps {
    children: ReactNode
    tableNumber: string
    remark: string
}

interface Area {
    tableNumber: string
    remark: string
}

const Remark: React.FC<OrderDetailsProps> = ({ children, tableNumber, remark }) => {

    const [remarks, setRemark] = useState(remark)
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const editremark = async (tableNumber: string, remark: string) => {
        try {
            const response = await fetch(`${apiUrl}/api/edit-remark`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableNumber, remark }),
            });
        } catch (error) {
            console.error('Error updating table state:', error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className='space-y-6'>
                    <DialogTitle>備註</DialogTitle>
                    <DialogDescription>
                        <Textarea
                            placeholder='請輸入備註'
                            value={remarks}
                            onChange={(e) => setRemark(e.target.value)}
                            className="rounded-md border border-gray-400 w-60"
                        />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" onClick={() => editremark(tableNumber, remarks)}>預約</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Remark
