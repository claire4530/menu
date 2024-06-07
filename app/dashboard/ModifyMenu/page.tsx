'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {CopyPlus, SmartphoneCharging, CircleX} from 'lucide-react'
import Image from 'next/image';
import { PencilIcon } from '@heroicons/react/24/outline'
import { Utensils } from 'lucide-react';
import useImage from './components/upload-photo';
import { Textarea } from "@/components/ui/textarea"
import { Input } from '@/components/ui/input'
import excuteQuery from '@/lib/db';
import axios from 'axios';

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

const App: React.FC = () => {
    const [areas, setAreas] = useState<Area[]>([])
    const [areaCount, setAreaCount] = useState<number>(0)
    const [newAreaName, setNewAreaName] = useState<string>('')
    const [newItemName, setNewItemName] = useState<string>('')
    const [confirmDeleteAreaId, setConfirmDeleteAreaId] = useState<
        number | null
    >(null)
    const [confirmDeleteItemId, setConfirmDeleteItemId] = useState<
        number | null
    >(null)

    const handleAddArea = () => {
        const newArea: Area = {
            id: areaCount + 1,
            name: newAreaName !== '' ? newAreaName : `Area ${areaCount + 1}`,
            items: [], // 新增区域时，物品列表为空
        }
        setAreas([...areas, newArea])
        setAreaCount(areaCount + 1)
        setNewAreaName('')
    }

    const confirmDeleteArea = (id: number) => {
        const updatedAreas = areas.filter((area) => area.id !== id)
        setAreas(updatedAreas)
        setConfirmDeleteAreaId(null)
    }

    const handleCancelDeleteArea = () => {
        setConfirmDeleteAreaId(null)
    }

    const handleEditAreaName = (id: number, newName: string) => {
        const updatedAreas = areas.map((area) =>
            area.id === id ? { ...area, name: newName } : area
        )
        setAreas(updatedAreas)
    }


    const handleAddItem = (areaId: number) => {
        const areaIndex = areas.findIndex((area) => area.id === areaId)
        if (areaIndex !== -1) {
            const newItem: Item = {
                id: areas[areaIndex].items.length + 1,
                name:
                    newItemName !== ''
                        ? newItemName
                        : `Item ${areas[areaIndex].items.length + 1}`,
                money: 0,
                switchOn: false,
                description: ""
            }
            const updatedArea = {
                ...areas[areaIndex],
                items: [...areas[areaIndex].items, newItem],
            }
            const updatedAreas = [...areas]
            updatedAreas[areaIndex] = updatedArea
            setAreas(updatedAreas)
            setNewItemName('')
            // axios.post('/api/sendpost', newItem)
        }
    }

    const handleDeleteItem = (areaId: number, itemId: number) => {
        const areaIndex = areas.findIndex((area) => area.id === areaId)
        if (areaIndex !== -1) {
            const updatedItems = areas[areaIndex].items.filter(
                (item) => item.id !== itemId
            )
            const updatedArea = { ...areas[areaIndex], items: updatedItems }
            const updatedAreas = [...areas]
            updatedAreas[areaIndex] = updatedArea
            setAreas(updatedAreas)
            setConfirmDeleteItemId(null)
        }
    }
    const handleCancelDeleteItem = () => {
        setConfirmDeleteItemId(null)
    }

    const handleEditItemdescription = (
        areaId: number,
        itemId: number,
        newName: string
    ) => {
        const areaIndex = areas.findIndex((area) => area.id === areaId)
        if (areaIndex !== -1) {
            const updatedItems = areas[areaIndex].items.map((item) =>
                item.id === itemId ? { ...item, description: newName } : item
            )
            const updatedArea = { ...areas[areaIndex], items: updatedItems }
            const updatedAreas = [...areas]
            updatedAreas[areaIndex] = updatedArea
            setAreas(updatedAreas)
        }
    }

    const handleEditItemMoney = (
        areaId: number,
        itemId: number,
        newName: number
    ) => {
        const areaIndex = areas.findIndex((area) => area.id === areaId)
        if (areaIndex !== -1) {
            const updatedItems = areas[areaIndex].items.map((item) =>
                item.id === itemId ? { ...item, money: newName } : item
            )
            const updatedArea = { ...areas[areaIndex], items: updatedItems }
            const updatedAreas = [...areas]
            updatedAreas[areaIndex] = updatedArea
            setAreas(updatedAreas)
        }
    }

    const handleEditItemName = (
        areaId: number,
        itemId: number,
        newName: string
    ) => {
        const areaIndex = areas.findIndex((area) => area.id === areaId)
        if (areaIndex !== -1) {
            const updatedItems = areas[areaIndex].items.map((item) =>
                item.id === itemId ? { ...item, name: newName } : item
            )
            const updatedArea = { ...areas[areaIndex], items: updatedItems }
            const updatedAreas = [...areas]
            updatedAreas[areaIndex] = updatedArea
            setAreas(updatedAreas)
        }
    }

    const [progress, setProgress] = React.useState(13)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    
    //switch
    const [switchLevels, setSwitchLevels] = useState<{
        [key: number]: { [key: number]: boolean }
    }>({});
    
    const handleSwitchClick = (
        areaId: number,
        itemId: number,
        newNumber: number
    ) => {
        // 根据newNumber确定布尔值
        const newBoolean = newNumber === 1;
    
        setSwitchLevels((prevSwitchLevels) => ({
            ...prevSwitchLevels,
            [areaId]: { ...prevSwitchLevels[areaId], [itemId]: newBoolean }, // 更新指定電磁爐的電源開關狀態
        }));
    };

    const [previousAreaName, setPreviousAreaName] = useState('')
    const handleCancel = () => {
        // 取消按钮点击后恢复到上一次的名称
        setNewAreaName(previousAreaName)
    }
    const handleContinue = () => {
        // 在此处添加您想要执行的“Continue”操作，例如保存新的区域名称等
        console.log('New area name:', newAreaName)
        // 保存当前名称作为上一次的名称
        setPreviousAreaName(newAreaName)
    }
    const { handleUpload, handleRemove, getInputRef, getImage } = useImage();

    return (
        <div className='gap-4 '>
            <div className="border-b">
                <div className="flex h-16 items-center px-4 gap-4">
                    <h2 className="text-3xl font-bold tracking-tight flex-grow">
                        新增菜單
                    </h2>
                    <div className="ml-auto flex items-center space-x-4">
                    <AlertDialog>
                        <AlertDialogTrigger className="h-20 w-20">
                            <Button variant="outline" className="">
                                新增分類
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader className="space-y-4">
                                <AlertDialogTitle className=''>輸入分類名稱</AlertDialogTitle>
                                <AlertDialogDescription className=''>
                                    <input
                                        type="text"
                                        placeholder="新增分類名稱"
                                        value={newAreaName}
                                        onChange={(e) => setNewAreaName(e.target.value)}
                                        className="rounded-md border border-gray-400 px-4 py-2"
                                    />
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel type="submit" onClick={handleCancel}>
                                    取消
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleAddArea}
                                >
                                    儲存
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    </div>
                </div>
            </div>        
            <div>
                <Tabs defaultValue="account" className="pt-10">
                    <TabsList className="grid grid-flow-col auto-cols-[minmax(0,_2fr)] h-[60px]">
                        {areas.map((area) => (
                            <TabsTrigger key={area.id} value={`area-${area.id}`} className="h-[50px]">
                                <div className='font-medium text-base'>{area.name}</div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <PencilIcon className="h-4 w-4 ml-4" />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader className='gap-4'>
                                            <AlertDialogTitle>
                                                修改分類名稱
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                <input
                                                    type="text"
                                                    placeholder="分類名稱.."
                                                    value={area.name}
                                                    onChange={(e) =>
                                                        handleEditAreaName( area.id, e.target.value )
                                                    }
                                                    className="mb-4 rounded-md border border-gray-300 px-4 py-2"
                                                />
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogAction onClick={handleContinue}>
                                                儲存
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {areas.map((area) => (
                        <TabsContent key={area.id} value={`area-${area.id}`}>
                            <Card>
                                <CardHeader className="gap-3">
                                    <CardTitle className='font-bold text-2xl flex justify-between'>
                                        <div className='flex gap-4 p-2'>
                                            <Utensils className="mt-1"/>
                                            {area.name}
                                        </div>
                                        <div className='flex gap-6'>
                                            <Button variant="outline" onClick={() => handleAddItem(area.id)} 
                                            className="mt-1 border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white">
                                                新增菜品
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger>
                                                    <Button variant="outline" className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                                                        刪除分類
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            你確定要刪除此分類嗎?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            此操作無法復原。這將永久刪除您的資料，並從我們的伺服器中刪除您的數據。
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            <button onClick={handleCancelDeleteArea}>
                                                                取消
                                                            </button>
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction>
                                                            <button onClick={() => confirmDeleteArea(area.id)}>
                                                                確認
                                                            </button>
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </CardTitle>
                                    <div className="border-b "></div>
                                </CardHeader>
                                <CardContent className="grid grid-flow-row-dense grid-cols-6">
                                {area.items.map((item) => (
                                    <div key={item.id} className=''>
                                        <div className='relative '>
                                            <div>
                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                        <Button className="bg-white text-black hover:bg-white rounded-lg w-36 h-40 flex flex-col">
                                                            {getImage(area.id, item.id) !== null ? (
                                                                <div>
                                                                    <img src={getImage(area.id, item.id)!.url} alt={getImage(area.id, item.id)!.name} width={100} />
                                                                    <div className='pt-2 font-bold text-base'>{item.name}</div>
                                                                </div>
                                                            ) : (
                                                                <div className='pt-2 font-bold text-base'>{item.name}</div>
                                                            )}
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                        <AlertDialogDescription>
                                                            <div>
                                                                <div className='flex gap-2 justify-right px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black text-base font-normal '>
                                                                    <div >
                                                                        菜品名稱 : 
                                                                    </div>
                                                                    <input type="text" placeholder="菜品名稱" value={item.name} 
                                                                        onChange={(e) => handleEditItemName(area.id,item.id,e.target.value)}
                                                                        className="rounded-md border border-gray-300 px-4 py-2"/>
                                                                </div>
                                                                <div className='text-base grid gap-4 justify-right px-4 py-6 h-30 text-black rounded-md hover:bg-slate-100'>
                                                                    <div>上傳圖片 :</div>
                                                                    {getImage(area.id, item.id) !== null ? (
                                                                        <div className='relative'>
                                                                            <img src={getImage(area.id, item.id)!.url} alt={getImage(area.id, item.id)!.name} width={100} />
                                                                            <CircleX className='hover:text-red-500 absolute top-0 left-28' onClick={() => handleRemove(area.id, item.id)}/>
                                                                        </div>
                                                                    ) : (
                                                                        <Input type="file" ref={getInputRef(area.id, item.id)} onChange={(e) => handleUpload(area.id, item.id, e)} />
                                                                    )}
                                                                </div>
                                                                <div className="flex gap-4 justify-right px-4 py-6 h-30 items-center text-black rounded-md hover:bg-slate-100">
                                                                    <div className='text-base'>
                                                                        價錢 : $
                                                                    </div>
                                                                    <input type="number" placeholder="菜品名稱" value={item.money} 
                                                                    onChange={(e) => handleEditItemMoney(area.id,item.id,parseFloat(e.target.value))}
                                                                    className="rounded-md border border-gray-300 px-4 py-2"/>
                                                                    
                                                                </div>
                                                                <div className="text-base justify-right px-4 py-6 grid h-30 gap-2 items-center rounded-md hover:bg-slate-100 text-black">
                                                                    介紹 :
                                                                    <textarea placeholder="菜品介紹" value={item.description} 
                                                                    onChange={(e) => handleEditItemdescription(area.id,item.id,e.target.value)}
                                                                    className="w-80 h-20 rounded-md border border-gray-300 px-4 py-2"/>
                                                                </div>
                                                                <div className="text-base justify-right px-4 py-6 flex h-10 items-center text-black gap-4 rounded-md hover:bg-slate-100">
                                                                    是否當季:
                                                                    <Switch
                                                                        id="是否當季"
                                                                        className=""
                                                                        checked={switchLevels[area.id]?.[item.id] || false}
                                                                        onCheckedChange={(newChecked: boolean) => handleSwitchClick(area.id, item.id, newChecked ? 1 : 0)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                        <AlertDialogAction>儲存</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                        <CircleX className='hover:text-red-500 absolute top-0 left-29'/>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                你確定要刪除此菜品嗎?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                此操作無法復原。這將永久刪除您的資料，並從我們的伺服器中刪除您的數據。
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                <button onClick={handleCancelDeleteItem}>
                                                                    取消
                                                                </button>
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction>
                                                                <button onClick={() => handleDeleteItem(area.id, item.id)}>
                                                                    確認
                                                                </button>
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}

export default App