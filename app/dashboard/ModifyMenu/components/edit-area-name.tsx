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

interface Item {
    id: number
    name: string
    description: string
    money: number
    switchOn: boolean
}

interface Area {
    id: number
    name: string
    items: Item[]
}

async function updateArea(
    name: string,
    id: number
): Promise<void> {
    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''

    await fetch(
        `${apiUrl}/api/edit-menu-name`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, id }),
        }
    )
}

const fetchTables = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    const areas: Area[] = await fetch(`${apiUrl}/api/menu`).then(res => res.json())
    return areas
}


const EditArea: React.FC<Area> = ({
    id,
    name,
}) => {
    const [areaName, setAreaName] = useState(name)
    const [previousAreaName, setPreviousAreaName] = useState(name)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    useEffect(() => {
        setPreviousAreaName(name);
        
    }, [name]);
    
    const handleAreaNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAreaName(e.target.value)
    }

    const handleContinue = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);
        const areas = await fetchTables();
        const isDuplicate = areas.some(area => area.name !== name && area.name === areaName);

        if (isDuplicate) {
            setErrorMessage("此區域已存在");
            setAreaName(previousAreaName);
        } else {
            updateArea(areaName, id);
            setSuccessMessage("修改成功");
        }
    }
    const returnToPrevious = () => {
        setSuccessMessage("");
        setErrorMessage("");
    }

    return (
        <Dialog>
            <DialogTrigger asChild >
                <PencilIcon className="h-4 w-4 ml-4" onClick={returnToPrevious}/>
            </DialogTrigger>
            <DialogContent>
                <div className="flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black">
                    <div className="font-semibold">
                        修改分類名稱:
                    </div>
                    <Input
                        type="text"
                        placeholder="修改分類名稱"
                        value={areaName}
                        onChange={handleAreaNameChange}
                        className="rounded-md border border-gray-400 px-4 py-2 w-30"
                    />
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
