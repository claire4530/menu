'use client'
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { TriangleAlert, SquareCheck } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import DeleteItems from './delete-item'

interface MenuProps {
    id: number
    name: string
    description: string
    money: number
    switchOn: boolean
    image: string
}

async function updateItemName(
    id: number,
    name: string,
    description: string,
    money: number,
    switchOn: boolean,
    image: string
): Promise<void> {
    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    await fetch(
        `${apiUrl}/api/edit-menu-items-name`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, description, money, switchOn, image }),
        }
    )
}

const MenuItems: React.FC<MenuProps> = ({
    id,
    name,
    description,
    money,
    switchOn,
    image,
}) => {
    const [areaName, setAreaName] = useState(name)
    const [areaImage, setAreaImage] = useState(image)
    const [areaDescription, setAreaDescription] = useState(description)
    const [areaMoney, setAreaMoney] = useState(money)
    const [areaSwitchOn, setAreaSwitchOn] = useState(switchOn)
    const [previousAreaName, setPreviousAreaName] = useState(name)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [file, setFile] = useState<File>()

    useEffect(() => {
        setPreviousAreaName(name);
        
    }, [name]);
    
    const handleAreaNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAreaName(e.target.value)
    }
    const handleAreaDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAreaDescription(e.target.value)
    }
    const handleAreaMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAreaMoney(Number(e.target.value))
    }
    const handleAreaSwitchOnChange = (state: boolean) => {
        setAreaSwitchOn(state)
    }
    const handleAreaImageChange = (imageUrl: string) => {
        setAreaImage(imageUrl);
    }

    const handleContinue = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);
        if (areaName === "") {
            setErrorMessage("菜品名稱不能為空");
            return;
        }
        let file_url = areaImage;
        if (file)
        {
            const formData = new FormData()
            formData.append('file', file)
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })
            if (response.ok) {
                const json = await response.json()
                file_url = json.url
                handleAreaImageChange(file_url);
            }
        }
        updateItemName(id, areaName, areaDescription, areaMoney, areaSwitchOn, file_url);
        setSuccessMessage("修改成功");
        
    }

    return (
        <div>
            <div className="flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black">
                <div className="font-semibold w-40">
                    修改菜品名稱:
                </div>
                <Input
                    type="text"
                    placeholder="修改菜品名稱"
                    value={areaName}
                    onChange={handleAreaNameChange}
                    className="rounded-md border border-gray-400 w-60"
                />
            </div>
            <div className="flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black">
                <div className="font-semibold w-40">
                    修改菜品圖片:
                </div>
                <Input
                    placeholder="Select file"
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                    className="rounded-md border border-gray-400 w-60"
                />
            </div>
            <div className="flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black">
                <div className="font-semibold w-40">
                    修改菜品介紹:
                </div>
                <Textarea
                    placeholder="修改菜品介紹"
                    value={areaDescription}
                    onChange={handleAreaDescriptionChange}
                    className="rounded-md border border-gray-400 w-60"
                />
            </div>
            <div className="flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black">
                <div className="font-semibold w-40">
                    修改菜品價錢:
                </div>
                <Input
                    type="number"
                    placeholder="修改菜品價錢"
                    value={areaMoney}
                    onChange={handleAreaMoneyChange}
                    className="rounded-md border border-gray-400 w-60 "
                />
            </div>
            <div className="flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black">
                <div className="font-semibold">
                    修改菜品是否當季:
                </div>
                <Switch
                    id="修改菜品是否當季"
                    checked={areaSwitchOn}
                    onCheckedChange={handleAreaSwitchOnChange}
                    className=""
                />
            </div>
            <div className='grid grid-cols-7'>
                <div className='ml-4 col-span-3'>
                    {errorMessage && <div className="text-red-500 flex gap-2 mt-2"><TriangleAlert />{errorMessage}</div>}
                    {successMessage && <div className="text-green-600 flex gap-2 mt-2"> <SquareCheck /> {successMessage} </div>}
                </div>
                <Button variant="default" className="col-span-2 w-20 justify-self-center" onClick={handleContinue}>儲存</Button>
                <div className='col-span-2 justify-self-center'>
                    <DeleteItems id={id} />
                </div>
            </div>
        </div>
    )
}

export default MenuItems
