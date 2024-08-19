import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface CookerInfoProps {
    cookerNumber: string
    state: boolean
    handlePowerStateChange: (state: boolean) => void
    tableNumber: string
    fireStatus: number
    handleFireStateChange: (state: number) => void
    error: string
    reason: string
    solution: string
    databaseFireStatus: number
    databaseState: string
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
    databaseState,
    databaseFireStatus,
}) => {

    const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8]
    const [switchState, setSwitchState] = useState(state);

    useEffect(() => {
        setSwitchState(databaseState === '開啟');
    }, [databaseState]);

    const handleSwitchChange = (checked: boolean) => {
        setSwitchState(checked);
        handlePowerStateChange(checked);
    };

    return (
        <div className='grid gap-2'>
            <div className="rounded-md p-4 text-black hover:bg-slate-100 grid gap-4 items-center">
                <div>電源開關：{databaseState}</div>
                <Switch
                    checked={switchState}
                    onCheckedChange={handleSwitchChange}
                    id="電磁爐電源開關"
                />
            </div>
            <div className='text-black hover:bg-slate-100 grid'>
                <div className='p-4'>火力狀況：{databaseFireStatus}</div>
                <div className="flex gap-4 p-4 items-center rounded-md">
                    {numbers.map((num) => (
                        <button
                            key={num}
                            className={cn(
                                'h-6 w-6 border rounded-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
                                fireStatus === num
                            )}
                            onClick={() => handleFireStateChange(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
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
