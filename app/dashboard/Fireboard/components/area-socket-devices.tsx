'use client'

import { cn } from '@/lib/utils'
import { Pencil } from 'lucide-react'
import ChangeSocketStateDialog from './change-socket-state-dialog'
import { useState } from 'react'

interface SocketProps {
    socketNumber: string
    state: string
    tableNumber: string
    error: string
    reason: string
    solution: string
    index: number
    broken: number
    databaseState: string
}

async function updateSocketState(
    socketNumber: string,
    newState: string
): Promise<void> {
    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''

    const response: Response = await fetch(`${apiUrl}/api/edit-socket-state`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ socketNumber, newState }),
    })
}

const AreaSocketDevices: React.FC<SocketProps> = ({
    socketNumber,
    state,
    tableNumber,
    error,
    reason,
    solution,
    index,
    broken,
    databaseState,
}) => {

    const [powerState, setPowerState] = useState(state !== '關閉')

    const handlePowerStateChange = (newState: boolean) => {
        setPowerState(newState)
        updateSocketState(socketNumber, newState ? '開啟' : '關閉')
    }

    return (
        <div className='grid gap-2'>
            <div className="flex items-center justify-between gap-2  ">
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
                    <div className='flex gap-2'>
                        插座編號 : <p className='font-semibold'>{socketNumber}</p>
                    </div>
                </div>
                <ChangeSocketStateDialog
                    socketNumber={socketNumber}
                    state={powerState}
                    handlePowerStateChange={handlePowerStateChange}
                    tableNumber={tableNumber}
                    error={error}
                    reason={reason}
                    solution={solution}
                    databaseState={databaseState}
                >
                    <Pencil className="cursor-pointer" size={20} />
                </ChangeSocketStateDialog>
            </div>
            <div className='ml-6 text-sm'>
                目前狀況 : &nbsp;
                {databaseState === "關閉" ? '關閉' : broken === 1 ? '錯誤' : '開啟'}
            </div>
        </div>
    )
}

export default AreaSocketDevices