'use client'

import { cn } from '@/lib/utils'
import { Pencil } from 'lucide-react'
import ChangeCookerStateDialog from './change-cooker-state-dialog'
import { useState } from "react"
import { Button } from '@/components/ui/button'

interface CookerProps {
    cookerNumber: number
    state: string
    tableNumber: string
    fireStatus: number
    error: string
    reason: string
    solution: string
}


const Cooker: React.FC<CookerProps> = ({
    cookerNumber,
    state,
    tableNumber,
    fireStatus,
    error,
    reason,
    solution,
}) => {
    const [powerState, setPowerState] = useState(state === "關閉" ? false : true)
    console.log(powerState);
    
    const [fireState, setfireState] = useState(fireStatus)

    const handlePowerStateChange = (state: boolean) => {
        setPowerState(state)
    }

    const handleFireStateChange = (state: number) => {
        setfireState(state)
    }

    return (
            <div className="flex items-center justify-between gap-2 text-sm ">
                <div className="flex items-center gap-2">
                    <div
                        className={cn(
                            'h-3 w-3 rounded-full',
                            powerState === false
                                ? 'bg-gray-500'
                                : state === '錯誤'
                                ? 'bg-red-500'
                                : 'bg-green-500'
                        )}
                    ></div>
                    {cookerNumber}號電磁爐 -- 火力狀況 : &nbsp;
                    {powerState === false
                                ? '/'
                                : state === '錯誤'
                                ? '/'
                                : fireState}
                </div>
                <ChangeCookerStateDialog cookerNumber={cookerNumber} state={powerState} handlePowerStateChange={handlePowerStateChange} tableNumber={tableNumber} fireStatus={fireState} handleFireStateChange={handleFireStateChange} error={error} reason={reason} solution={solution}>
                    <Pencil className='cursor-pointer' size={20}/>
                </ChangeCookerStateDialog>
                
            </div>
    )
}

export default Cooker
