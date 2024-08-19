import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface SocketInfoProps {
    socketNumber: string
    state: boolean
    handlePowerStateChange: (state: boolean) => void
    tableNumber: string
    error: string
    reason: string
    solution: string
    databaseState: string
}

const SocketInfo: React.FC<SocketInfoProps> = ({
    socketNumber,
    state,
    handlePowerStateChange,
    tableNumber,
    error,
    reason,
    solution,
    databaseState,
}) => {

    const [switchState, setSwitchState] = useState(state);

    useEffect(() => {
        setSwitchState(databaseState === '開啟');
    }, [databaseState]);

    const handleSwitchChange = (checked: boolean) => {
        setSwitchState(checked);
        handlePowerStateChange(checked);
    };

    return (
        <div>
            <div className="rounded-md p-4 text-black hover:bg-slate-100 grid gap-4 items-center">
                <div>電源開關：{databaseState}</div>
                <Switch
                    checked={switchState}
                    onCheckedChange={handleSwitchChange}
                    id="電磁爐電源開關"
                />
            </div>
            <div className="justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                插座錯誤代碼：{error}
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

export default SocketInfo
