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
import SocketInfo from './socket-info'
import DeleteSockets from './delete-sockets'

interface ChangeSocketStateDialogProps {
    socketNumber: string
    state: boolean
    handlePowerStateChange: (state: boolean) => void
    tableNumber: string
    error: string
    reason: string
    solution: string
    children: ReactNode
    databaseState: string
}

const ChangeSocketStateDialog: React.FC<ChangeSocketStateDialogProps> = ({
    socketNumber,
    state,
    handlePowerStateChange,
    tableNumber,
    error,
    reason,
    solution,
    children,
    databaseState,
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                        <SocketInfo
                            socketNumber={socketNumber}
                            state={state}
                            handlePowerStateChange={handlePowerStateChange}
                            tableNumber={tableNumber}
                            error={error}
                            reason={reason}
                            solution={solution}
                            databaseState={databaseState}
                        />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DeleteSockets socketNumber={socketNumber} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ChangeSocketStateDialog
