'use client'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { CookingPot, Plug } from 'lucide-react'
import { CopyPlus, SmartphoneCharging, CircleX } from 'lucide-react'
import DeleteAreas from './delete-areas'
import CookerButton from './cooker-button'
import SocketButton from './socket-button'
import AreaDevices from './area-devices'
import AreaSocketDevices from './area-socket-devices'

interface TableProps {
    id: number
    tableNumber: string
    maxCookers: number
    maxSockets: number
}

export type CookerPayment = {
    cookerNumber: string
    state: '關閉' | '開啟'
    tableNumber: string
    fireStatus: number
    error: string
    reason: string
    solution: string
    broken: number
}

export type SocketPayment = {
    socketNumber: string
    state: '關閉' | '開啟' 
    tableNumber: string
    error: string
    reason: string
    solution: string
    broken: number
}


const Table: React.FC<TableProps> = ({
    id,
    tableNumber,
    maxCookers,
    maxSockets,
}) => {

    const [cookerProps, setCookerProps] = useState<CookerPayment[]>([])
    const [socketProps, setSocketProps] = useState<SocketPayment[]>([])

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''

    const fetchCookerProps = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/cooker`);
            const data: CookerPayment[] = await res.json();
            setCookerProps(data);
        } catch (error) {
            console.error('Failed to fetch cooker data:', error);
        }
    };

    const fetchSocketProps = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/socket`);
            const data: SocketPayment[] = await res.json();
            setSocketProps(data);
        } catch (error) {
            console.error('Failed to fetch socket data:', error);
        }
    };

    useEffect(() => {
        fetchCookerProps();
        fetchSocketProps();
        const interval = setInterval(() => {
            fetchCookerProps();
            fetchSocketProps();
        }, 1000); 

        return () => clearInterval(interval); 
    }, [apiUrl]);

    const filteredCookerProps = Array.isArray(cookerProps) ? cookerProps.filter(cooker => cooker.tableNumber === tableNumber) : [];
    const filteredSocketProps = Array.isArray(socketProps) ? socketProps.filter(socket => socket.tableNumber === tableNumber) : [];

    return (
        <div className="w-full">
            <Card>
                <CardHeader className="gap-3">
                    <CardTitle className="font-medium text-xl flex justify-between">
                        <div className="flex gap-2">
                            <CopyPlus />
                            新增裝置
                        </div>
                        <DeleteAreas id={id} />
                    </CardTitle>
                    <div className="border-b "></div>
                </CardHeader>
                <CardContent className="flex gap-14">
                    <CookerButton areas_id={id} tableNumber={tableNumber} maxCookers={maxCookers} />
                    <SocketButton areas_id={id} tableNumber={tableNumber} maxSockets={maxSockets} />
                </CardContent>
                <CardHeader className="gap-3">
                    <CardTitle className="font-medium text-xl flex gap-2">
                        <SmartphoneCharging />
                        目前裝置
                    </CardTitle>
                    <div className="border-b "></div>
                    <div className='grid gap-4 grid-cols-2 '>
                        <Card className="space-y-4">
                            <CardHeader>
                                <CardTitle className='flex gap-2'> <CookingPot />電磁爐 </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    {filteredCookerProps.map((item, index) => (
                                        <div className="grid gap-2">
                                            <AreaDevices
                                                key={index}
                                                {...item}
                                                index={index}
                                                databaseFireStatus={item.fireStatus}
                                                databaseState={item.state}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>    
                        <Card className="space-y-4">
                            <CardHeader>
                                <CardTitle className='flex gap-2'> <Plug />插座 </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    {filteredSocketProps.map((item, index) => (
                                        <div className="">
                                            <AreaSocketDevices
                                                key={index}
                                                {...item}
                                                index={index}
                                                databaseState={item.state}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>   
                    </div>                
                </CardHeader>
                
            </Card>
        </div>
    )
}

export default Table
