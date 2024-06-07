import { ReactNode } from 'react'
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
import CookerInfo from './cooker-info'
import { useState } from "react"

interface ChangeCookerStateDialogProps {
    cookerNumber: number
    state: boolean
    handlePowerStateChange: (state: boolean) => void
    tableNumber: string
    fireStatus: number
    handleFireStateChange: (state: number) => void
    error: string
    reason: string
    solution: string
    children: ReactNode
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
}) => {
    

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                        <CookerInfo cookerNumber={cookerNumber} state={state} handlePowerStateChange={handlePowerStateChange} tableNumber={tableNumber} fireStatus={fireStatus} handleFireStateChange={handleFireStateChange} error={error} reason={reason} solution={solution} />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" className="mr-4">
                        儲存變更
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ChangeCookerStateDialog
