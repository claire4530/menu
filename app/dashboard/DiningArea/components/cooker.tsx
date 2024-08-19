'use client'

import { cn } from '@/lib/utils'
import { Pencil } from 'lucide-react'
import ChangeCookerStateDialog from './change-cooker-state-dialog'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface CookerProps {
    cookerNumber: string
    state: string
    tableNumber: string
    fireStatus: number
    error: string
    reason: string
    solution: string
    index: number
    broken: number
    databaseFireStatus: number
    databaseState: string
}

async function updateCookerState(
    cookerNumber: string,
    newState: string
): Promise<void> {
    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''

    const response: Response = await fetch(`${apiUrl}/api/edit-cooker-state`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cookerNumber, newState }),
    })
}

async function updateCookerFireState(
    cookerNumber: string,
    newfireStatus: number
): Promise<void> {
    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''

    const response: Response = await fetch(
        `${apiUrl}/api/edit-cooker-fire-state`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cookerNumber, newfireStatus }),
        }
    )
}

const Cooker: React.FC<CookerProps> = ({
    cookerNumber,
    state,
    tableNumber,
    fireStatus,
    error,
    reason,
    solution,
    index,
    broken,
    databaseFireStatus,
    databaseState,
}) => {
    const [powerState, setPowerState] = useState(state !== '關閉')
    const [fireState, setFireState] = useState(fireStatus)

    const handlePowerStateChange = (newState: boolean) => {
        setPowerState(newState)
        updateCookerState(cookerNumber, newState ? '開啟' : '關閉')
    }

    const handleFireStateChange = (newFireState: number) => {
        setFireState(newFireState)
        updateCookerFireState(cookerNumber, newFireState)
    }

    return (
        <div className="flex items-center justify-between gap-2 text-sm ">
            <div className="flex items-center gap-2">
                <div
                    className={cn(
                        'h-3 w-3 rounded-full',
                        databaseState === "關閉"
                            ? 'bg-gray-500'
                            : broken === 1
                            ? 'bg-red-500'
                            : 'bg-green-500'
                    )}
                ></div>
                {index + 1}號電磁爐 -- 火力狀況 : &nbsp;
                {databaseState === "關閉" ? '/' : broken === 1 ? '/' : databaseFireStatus}
            </div>
            <ChangeCookerStateDialog
                cookerNumber={cookerNumber}
                state={powerState}
                handlePowerStateChange={handlePowerStateChange}
                tableNumber={tableNumber}
                fireStatus={fireState}
                handleFireStateChange={handleFireStateChange}
                error={error}
                reason={reason}
                solution={solution}
                databaseFireStatus={databaseFireStatus}
                databaseState={databaseState}
            >
                <Pencil className="cursor-pointer" size={20} />
            </ChangeCookerStateDialog>
        </div>
    )
}

export default Cooker
