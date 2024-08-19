import { useState, ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import CookerInfo from '@/app/dashboard/DiningArea/components/cooker-info'
import DeleteCookers from './delete-cookers'

interface ChangeCookerStateDialogProps {
    cookerNumber: string
    state: boolean
    handlePowerStateChange: (state: boolean) => void
    tableNumber: string
    fireStatus: number
    handleFireStateChange: (state: number) => void
    error: string
    reason: string
    solution: string
    children: ReactNode
    databaseFireStatus: number
    databaseState: string
}

const ChangeCookerStateDialog: React.FC<ChangeCookerStateDialogProps> = ({
    cookerNumber,
    state,
    handlePowerStateChange,
    tableNumber,
    fireStatus,
    handleFireStateChange,
    error,
    reason,
    solution,
    children,
    databaseFireStatus,
    databaseState,
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                        <CookerInfo
                            cookerNumber={cookerNumber}
                            state={state}
                            handlePowerStateChange={handlePowerStateChange}
                            tableNumber={tableNumber}
                            fireStatus={fireStatus}
                            handleFireStateChange={handleFireStateChange}
                            error={error}
                            reason={reason}
                            solution={solution}
                            databaseFireStatus={databaseFireStatus}
                            databaseState={databaseState}
                        />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DeleteCookers cookerNumber={cookerNumber} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ChangeCookerStateDialog
