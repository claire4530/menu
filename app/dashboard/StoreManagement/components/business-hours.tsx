import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { TimeChange } from './time-change'
import { Button } from "@/components/ui/button"
import { Clock, Utensils  } from 'lucide-react';
import { ResponsiveTimePickers } from './time'
import dayjs from 'dayjs';

interface Area {
    start_time: string
    end_time: string
}

async function editState(start_time: string, end_time: string): Promise<void> {

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    await fetch(`${apiUrl}/api/edit-business-time`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ start_time, end_time }),
        }
    )
}

const BusinessTime : React.FC = () => {

    const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(dayjs());
    const [endTime, setEndTime] = useState<dayjs.Dayjs | null>(dayjs());
    const [error, setError] = useState<string | null>(null);

    const handleConfirm = async () => {
        if (startTime && endTime) {
            await editState(startTime.format('HH:mm:ss'), endTime.format('HH:mm:ss'));
            alert('時間已更新');
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between mt-2">
                <CardTitle className="text-sm font-medium">
                    營業時間調整
                </CardTitle>
                <Clock className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex gap-2">
                <ResponsiveTimePickers 
                    onTimeChange={(start, end) => {
                        setStartTime(start);
                        setEndTime(end);
                    }}
                    onError={(errorMessage) => {
                        setError(errorMessage);
                    }}
                />
                <Button
                    variant="default"
                    className="mt-3 ml-2 w-16 h-10 text-sm"
                    onClick={handleConfirm}
                    disabled={!!error} // Disable button if there is an error
                >
                    確認
                </Button>
                {/* {error && <div className="error-message text-red-500 mt-2">{error}</div>} */}
            </CardContent>
        </Card>
    )
}

export default BusinessTime