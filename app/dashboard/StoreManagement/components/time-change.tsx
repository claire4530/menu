'use client'
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
import { Input } from '@/components/ui/input'
import { TriangleAlert, SquareCheck } from 'lucide-react'


interface Area {
    name: string
}

interface Business {
    id: number
    meal_time: string
}

async function editMealTime(remainingMealTime: number): Promise<void> {

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    await fetch(`${apiUrl}/api/edit-table-meal-time`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ remainingMealTime }),
        }
    )
}

export const TimeChange: React.FC = ({
}) => {
    const [areaName, setAreaName] = useState("")
    const [previousAreaName, setPreviousAreaName] = useState("")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [time, setTime] = useState<Business[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/business`);
            const result = await response.json();
            setTime(result);
            console.log('moneyProps:', time);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleAreaNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPreviousAreaName(e.target.value)
    }

    const handleContinue = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);

        if (previousAreaName === '') {
            setErrorMessage("時間不能為空")
        } else {
            const numericAreaName = Number(previousAreaName)
            setAreaName(previousAreaName)  // 确定后更新areaName
            editMealTime(numericAreaName)
            setSuccessMessage("修改成功")
        }
        
    }
    const returnToPrevious = () => {
        setSuccessMessage("");
        setErrorMessage("");
        setPreviousAreaName(areaName);
    }

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次資料

        return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="h-34 flex gap-4 font-bold text-4xl" onClick={returnToPrevious}>
                    {time && time.map((times) => (
                        <div key={times.id} className="">
                            <p>{times.meal_time}</p>
                        </div>
                    ))}
                    <span className="font-bold text-lg mt-3 text-muted-foreground">min</span>
                </Button>
            </DialogTrigger>
            <DialogContent className='w-[400px]'>
                <DialogHeader className="gap-6">
                    <DialogTitle>修改用餐時間</DialogTitle>
                    <DialogDescription>
                        <Input
                            type="number"
                            placeholder="modify.."
                            value={previousAreaName}
                            onChange={handleAreaNameChange}
                            className="mb-4 rounded-md border border-gray-300 px-4 py-2"
                        />
                    </DialogDescription>
                </DialogHeader>
                <div className='flex justify-between'>
                    <div>
                        {errorMessage && <div className="text-red-500 flex gap-2 mt-2"><TriangleAlert />{errorMessage}</div>}
                        {successMessage && <div className="text-green-600 flex gap-2 mt-2"> <SquareCheck /> {successMessage} </div>}
                    </div>
                    <Button type="submit" className="w-30" onClick={handleContinue}>儲存</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default TimeChange