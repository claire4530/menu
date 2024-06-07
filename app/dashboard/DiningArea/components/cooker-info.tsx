
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useState } from "react"

interface CookerInfoProps {
    cookerNumber: number
    state: boolean
    handlePowerStateChange: (state: boolean) => void
    tableNumber: string
    fireStatus: number
    handleFireStateChange: (state: number) => void
    error: string
    reason: string
    solution: string
}

const CookerInfo: React.FC<CookerInfoProps> = ({
    cookerNumber,
    state,
    handlePowerStateChange,
    tableNumber,
    fireStatus,
    handleFireStateChange,
    error,
    reason,
    solution,
}) => {
    const numbers: number[] = [1, 2, 3, 4, 5]

    return (
        <div>
            <div className="rounded-md p-4 text-black hover:bg-slate-100 flex gap-4 items-center">
                電磁爐電源開關：
                <Switch
                    checked={state}
                    onCheckedChange={handlePowerStateChange}
                    id="電磁爐電源開關"
                />
            </div>
            <div className="flex gap-4 items-center rounded-md p-4 text-black hover:bg-slate-100">
                火力狀況：&nbsp;
                {numbers.map((num) => (
                    <button key={num} className={cn("h-6 w-6 rounded-full hover:bg-blue-500", fireStatus === num && "bg-blue-300")} onClick={() => handleFireStateChange(num)}>
                        {num}
                    </button>
                ))}
            </div>
            <div className="justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                電磁爐錯誤代碼：{error}
            </div>
            <div className="justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                可能原因：{reason}
            </div>
            <div className="justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                處理方法：{solution}
            </div>
        </div>
    )
}

export default CookerInfo

