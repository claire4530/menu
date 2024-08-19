import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { TimeChange } from './time-change'
import { Button } from "@/components/ui/button"
import { Utensils  } from 'lucide-react';

interface Area {
    remainingMealTime: number
}

async function editState(remainingMealTime: number): Promise<void> {

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

const MealTime : React.FC = () => {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between mt-2">
                <CardTitle className="text-sm font-medium">
                    用餐時間調整
                </CardTitle>
                <Utensils className='h-6 w-6 text-muted-foreground'/>
            </CardHeader>
            <CardContent className="">
                <TimeChange ></TimeChange>
            </CardContent>
        </Card>
    )
}

export default MealTime