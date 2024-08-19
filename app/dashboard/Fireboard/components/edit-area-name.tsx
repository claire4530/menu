'use client'
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from "@/components/ui/button"
import { PencilIcon } from '@heroicons/react/24/outline'
import { Input } from '@/components/ui/input'
import { TriangleAlert, SquareCheck } from 'lucide-react'

export type Area = {
    id: number
    tableNumber: string
    cookerNumber: number
    socketNumber: number
    seats: number
    items: Item[]
}
interface Item {
    cookerNumber: string
    fireStatus: number
    switchOn: boolean
    type: 'cooker' | 'socket'
    broken: number
    tableNumber: string
    state: '關閉' | '開啟' | '錯誤'
    error: string
    reason: string
    solution: string
}

async function updateArea(
    id: number,
    tableNumber: string,
    cookerNumber: number,
    seats: number,
    socketNumber: number
): Promise<void> {
    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''

    await fetch(
        `${apiUrl}/api/edit-area-name`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, tableNumber, cookerNumber, seats, socketNumber }),
        }
    )
}

const fetchTables = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    const areas: Area[] = await fetch(`${apiUrl}/api/areas`).then(res => res.json())
    return areas
}


const EditArea: React.FC<Area> = ({
    id,
    tableNumber,
    cookerNumber,
    socketNumber,
    seats,
    items = [],
}) => {
    const [areaName, setAreaName] = useState(tableNumber)
    const [previousAreaName, setPreviousAreaName] = useState(tableNumber)
    const [areaSeats, setAreaSeats] = useState(seats)
    const [areaCookerNumber, setAreaCookerNumber] = useState(cookerNumber)
    const [areaSocketNumber, setAreaSocketNumber] = useState(socketNumber)
    const [errorLowerThanCooker, setLowerThanCooker] = useState('')
    const [errorLowerThanSocket, setLowerThanSocket] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [cookerCount, setCookerCount] = useState<number>(0);
    const [socketCount, setSocketCount] = useState<number>(0);

    useEffect(() => {
        // Fetch cooker data and count matching cooker numbers on component mount or when tableNumber changes
        const fetchCookerProps = async () => {
            const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';
            try {
                const res = await fetch(`${apiUrl}/api/cooker`);
                const data: Item[] = await res.json();
                const matchingCookerNumbers = data.filter(cooker => cooker.tableNumber === tableNumber);
                setCookerCount(matchingCookerNumbers.length);

                const res1 = await fetch(`${apiUrl}/api/socket`);
                const data1: Item[] = await res1.json();
                const matchingSocketNumbers = data1.filter(socket => socket.tableNumber === tableNumber);
                setSocketCount(matchingSocketNumbers.length);
            } catch (error) {
                console.error('Failed to fetch cooker data:', error);
            }
        };
        fetchCookerProps();
        setPreviousAreaName(tableNumber);
        

    }, [tableNumber]);
    
    const handleAreaNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAreaName(e.target.value)
    }

    const handleSeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAreaSeats(Number(e.target.value))
    }

    const handleCookerNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCookerNumber = Number(e.target.value)
        if (newCookerNumber < cookerCount) {
            setLowerThanCooker('電磁爐數量不能低於區域內現有的電磁爐數量!')
        } else {
            setLowerThanCooker('')
            setAreaCookerNumber(newCookerNumber)
        }
    }

    const handleSocketNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSocketNumber = Number(e.target.value)
        if (newSocketNumber < socketCount) {
            setLowerThanSocket('插座數量不能低於區域內現有的插座數量!')
        } else {
            setLowerThanSocket('')
            setAreaSocketNumber(newSocketNumber)
        }
    }

    const handleContinue = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);
        const areas = await fetchTables();
        const isDuplicate = areas.some(area => area.tableNumber !== tableNumber && area.tableNumber === areaName);

        if (isDuplicate) {
            setErrorMessage("此區域已存在");
            setAreaName(previousAreaName);
        } else {
            // No duplicate found, proceed with update
            if (!errorLowerThanCooker && !errorLowerThanSocket) {
                updateArea(id, areaName, areaCookerNumber, areaSeats, areaSocketNumber);
                setSuccessMessage("修改成功");
            }
        }
    }
    const returnToPrevious = () => {
        setAreaName(tableNumber);
        setAreaSeats(seats);
        setAreaCookerNumber(cookerNumber);
        setAreaSocketNumber(socketNumber);
        setErrorMessage(null);
        setSuccessMessage(null);
        setLowerThanCooker('');
        setLowerThanSocket('');
    }

    return (
        <Dialog>
            <DialogTrigger asChild >
                <PencilIcon className="h-4 w-4 ml-4" onClick={returnToPrevious}/>
            </DialogTrigger>
            <DialogContent>
                <div className="flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black">
                    <div className="font-semibold">
                        修改區域名稱:
                    </div>
                    <Input
                        type="text"
                        placeholder="修改區域名稱"
                        value={areaName}
                        onChange={handleAreaNameChange}
                        className="rounded-md border border-gray-400 px-4 py-2 w-30"
                    />
                </div>
                <div className="flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black">
                    <div className="font-semibold">
                        修改座位數量:
                    </div>
                    <Input
                        type="number"
                        placeholder="修改座位數量"
                        value={areaSeats}
                        onChange={handleSeatsChange}
                        className="rounded-md border border-gray-400 px-4 py-2 w-30"
                    />
                </div>
                <div className="grid gap-3 justify-right px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black">
                    <div className="flex gap-2 justify-between">
                        <div className="font-semibold mt-2">
                            修改電磁爐數量:
                        </div>
                        <Input
                            type="number"
                            placeholder="修改電磁爐數量"
                            value={areaCookerNumber}
                            onChange={handleCookerNumberChange}
                            className="rounded-md border border-gray-400 px-4 py-2 w-30"
                        />
                    </div>
                    <div>
                        {errorLowerThanCooker && (
                            <div className="text-red-500 text-sm">
                                {errorLowerThanCooker}
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid gap-3 justify-right px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black">
                    <div className="flex gap-2 justify-between">
                        <div className="font-semibold mt-2">
                            修改插座數量:
                        </div>
                        <Input
                            type="number"
                            placeholder="修改插座數量"
                            value={areaSocketNumber}
                            onChange={handleSocketNumberChange}
                            className="rounded-md border border-gray-400 px-4 py-2 w-30"
                        />
                    </div>
                    <div>
                        {errorLowerThanSocket && (
                            <p className="text-red-500 text-sm">
                                {errorLowerThanSocket}
                            </p>
                        )}
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='ml-4'>
                        {errorMessage && <div className="text-red-500 flex gap-2 mt-2"><TriangleAlert />{errorMessage}</div>}
                        {successMessage && <div className="text-green-600 flex gap-2 mt-2"> <SquareCheck /> {successMessage} </div>}
                    </div>
                    <Button type="submit" className="w-30" onClick={handleContinue}>儲存</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditArea
