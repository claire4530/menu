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

import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {CopyPlus, SmartphoneCharging, CircleX} from 'lucide-react'
import Image from 'next/image';
import cookerImage from "./devicePhoto/cooker.png"
import TVImage from "./devicePhoto/TV.png"
import { PencilIcon } from '@heroicons/react/24/outline'

interface Item {
    id: number
    name: string
    status: number
    switchOn: boolean
    type: 'cooker'|'socket'
    uniqueId: string

}

interface Area {
    id: number
    name: string
    items: Item[]
    people: number
    cookerNumber: number
    socketNumber: number
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
    const [newAreaPeople, setNewAreaPeople] = useState<number>(0)
    const [newAreaCookerNumber, setNewAreaCookerNumber] = useState<number>(0)
    const [newAreaSocketNumber, setNewAreaSocketNumber] = useState<number>(0)

    const handleAddArea = () => {
        const newArea: Area = {
            id: areaCount + 1,
            name: newAreaName !== '' ? newAreaName : `Area ${areaCount + 1}`,
            items: [],
            people: newAreaPeople,
            cookerNumber: newAreaCookerNumber,
            socketNumber: newAreaSocketNumber,
        }
        setAreas([...areas, newArea])
        setAreaCount(areaCount + 1)
        setNewAreaName('')
        setNewAreaPeople(0)
        setNewAreaCookerNumber(0)
        setNewAreaSocketNumber(0)
    }

    const handleEditAreaPeople = (id: number, newName: number) => {
        const updatedAreas = areas.map((area) =>
            area.id === id ? { ...area, people: newName } : area
        )
        setAreas(updatedAreas)
    }

    const [errorLowerThanCooker, setLowerThanCooker] = useState('');
    const handleEditAreaCookerNumber = (id: number, newNumber: number) => {

        const existingCookerCount = areas.find(area => area.id === id)?.items.filter(item => item.type === 'cooker').length || 0;
        if (newNumber < existingCookerCount) {
            setLowerThanCooker('電磁爐數量不能低於區域內電磁爐!');
            return;
        }
        const updatedAreas = areas.map((area) =>
            area.id === id ? { ...area, cookerNumber: newNumber } : area
        )
        setAreas(updatedAreas)
    }
    const [errorLowerThanSocket, setLowerThanSocket] = useState('');
    const handleEditAreaSocketNumber = (id: number, newNumber: number) => {

        const existingSocketCount = areas.find(area => area.id === id)?.items.filter(item => item.type === 'socket').length || 0;
        if (newNumber < existingSocketCount) {
            setLowerThanSocket('電磁爐數量不能低於區域內插座!');
            return;
        }
        const updatedAreas = areas.map((area) =>
            area.id === id ? { ...area, socketNumber: newNumber } : area
        )
        setAreas(updatedAreas)
    }

    const handleContinue = () => {
        setLowerThanCooker("")
        setLowerThanSocket("")
    }

    const handleCancel = () => {
        setNewAreaName('')
        setNewAreaPeople(0)
        setNewAreaCookerNumber(0)
        setNewAreaSocketNumber(0)
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

    // const [number, setNumber] = useState(0);
    const [fireLevels, setFireLevels] = useState<{
        [key: number]: { [key: number]: number }
    }>({})

    const handleButtonClick = (
        areaId: number,
        itemId: number,
        newNumber: number
    ) => {
        setFireLevels((prevFireLevels) => ({
            ...prevFireLevels,
            [areaId]: { ...prevFireLevels[areaId], [itemId]: newNumber }, // 更新指定電磁爐的火力情况
        }))
    }
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
    
    const SocketNumber = [
        's0001', 's0002', 's0003', 's0004',"s0005","s0006"
    ];

    const CookerNumber = [
        'c0001', 'c0002', 'c0003', 'c0004',"c0005","c0006"
    ];

    const [inputCookerValue, setInputCookerValue] = useState('');
    const [inputSocketValue, setInputSocketValue] = useState('');
    const [errorCookerMessage, setCookerErrorMessage] = useState('');
    const [errorSocketMessage, setSocketErrorMessage] = useState('');

    const handleInputSocketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputSocketValue(e.target.value);
    };

    const handleInputCookerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputCookerValue(e.target.value);
    };

    const handleAddItem = (areaId: number, type: 'cooker' | 'socket', uniqueId: string) => {
        const areaIndex = areas.findIndex((area) => area.id === areaId)
        if (areaIndex !== -1) {
            let newItemName = '';
            if (type === 'cooker') {
                newItemName = newItemName !== '' ? newItemName : `Cooker ${areas[areaIndex].items.length + 1}`;
            } else if (type === 'socket') {
                newItemName = newItemName !== '' ? newItemName : `Socket ${areas[areaIndex].items.length + 1}`;
            }
            const newItem: Item = {
                id: areas[areaIndex].items.length + 1,
                name: newItemName,
                status: 1,
                switchOn: false,
                type: type,
                uniqueId: uniqueId,
            };
            const updatedArea: Area = {
                ...areas[areaIndex],
                items: [...areas[areaIndex].items, newItem],
            };
            const updatedAreas = [...areas];
            updatedAreas[areaIndex] = updatedArea;
            setAreas(updatedAreas);
            setNewItemName('');
        }
    }
    const handleConfirmClick = (areaId: number, type: 'cooker' | 'socket') => {
        const area = areas.find(area => area.id === areaId);
        if (!area) return;

        if (type === 'cooker') {
            if (!CookerNumber.includes(inputCookerValue)) {
                setCookerErrorMessage('沒有此電磁爐編號！');
                return;
            }
            if (area.items.filter(item => item.type === 'cooker').length >= area.cookerNumber) {
                setCookerErrorMessage('電磁爐數量已達上限！');
                return;
            }
            const isDuplicate = areas.some(area =>
                area.items.some(item => item.uniqueId === inputCookerValue)
            );
            if (isDuplicate) {
                setCookerErrorMessage('電磁爐編號已存在！');
                return;
            }
            handleAddItem(areaId, 'cooker', inputCookerValue);
        } else if (type === 'socket') {
            if (!SocketNumber.includes(inputSocketValue)) {
                setSocketErrorMessage('沒有此插座編號！');
                return;
            }
            if (area.items.filter(item => item.type === 'socket').length >= area.socketNumber) {
                setSocketErrorMessage('插座數量已達上限！');
                return;
            }
            const isDuplicate = areas.some(area =>
                area.items.some(item => item.uniqueId === inputSocketValue)
            );
            if (isDuplicate) {
                setSocketErrorMessage('插座編號已存在！');
                return;
            }
            handleAddItem(areaId, 'socket', inputSocketValue);
        }
        setSocketErrorMessage(''); 
        setCookerErrorMessage('');
    };
    const handleCancelClick = () => {
        setInputCookerValue(''); 
        setInputSocketValue(''); 
        setSocketErrorMessage(''); 
        setCookerErrorMessage('');
    };
    

    return (
        <div className='gap-4 '>
            <div className="border-b">
                <div className="flex h-16 items-center px-4 gap-4">
                    <h2 className="text-3xl font-bold tracking-tight flex-grow">
                        區域管理
                    </h2>
                    <div className="ml-auto flex items-center space-x-4">
                    <AlertDialog>
                        <AlertDialogTrigger className="h-20 w-20">
                            <Button variant="outline" className="">
                                新增區域
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader className="">
                                <div className='flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black'>
                                    <div className='font-semibold'>區域名稱:</div>
                                    <Input
                                        type="text"
                                        placeholder="新增區域名稱"
                                        value={newAreaName}
                                        onChange={(e) => setNewAreaName(e.target.value)}
                                        className="rounded-md border border-gray-400 px-4 py-2 w-30"
                                    />
                                </div>
                                <div className='flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black'>
                                    <div className='font-semibold'>座位數量:</div>
                                    <Input
                                        type="number"
                                        placeholder="新增座位數量"
                                        value={newAreaPeople}
                                        onChange={(e) => setNewAreaPeople(parseFloat(e.target.value))}
                                        className="rounded-md border border-gray-400 px-4 py-2 w-30"
                                    />
                                </div>
                                <div className='flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black'>
                                    <div className='font-semibold'>電磁爐數量:</div>
                                    <Input
                                        type="number"
                                        placeholder="新增座位上電磁爐數量"
                                        value={newAreaCookerNumber}
                                        onChange={(e) => setNewAreaCookerNumber(parseFloat(e.target.value))}
                                        className="rounded-md border border-gray-400 px-4 py-2 w-30"
                                    />
                                </div>
                                <div className='flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black'>
                                    <div className='font-semibold'>插座數量:</div>
                                    <Input
                                        type="number"
                                        placeholder="新增座位上插座數量"
                                        value={newAreaSocketNumber}
                                        onChange={(e) => setNewAreaSocketNumber(parseFloat(e.target.value))}
                                        className="rounded-md border border-gray-400 px-4 py-2 w-30"
                                    />
                                </div>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel type="submit" onClick={handleCancel}>
                                    取消
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    type="submit"
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
                                <div className='flex gap-4'>
                                    <div className='font-medium text-base'>{area.name}</div>
                                    <div className='text-base'>( {area.people}人座 )</div>
                                </div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <PencilIcon className="h-4 w-4 ml-4" />
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader className='gap-4'>
                                            <AlertDialogHeader className="">
                                                <div className='flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black'>
                                                    <div className='font-semibold'>修改區域名稱:</div>
                                                    <Input
                                                        type="text"
                                                        placeholder="修改區域名稱"
                                                        value={area.name}
                                                        onChange={(e) => handleEditAreaName(area.id, e.target.value)}
                                                        className="rounded-md border border-gray-400 px-4 py-2 w-30"
                                                    />
                                                </div>
                                                <div className='flex gap-2 justify-between px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black'>
                                                    <div className='font-semibold'>修改座位數量:</div>
                                                    <Input
                                                        type="number"
                                                        placeholder="修改座位數量"
                                                        value={area.people}
                                                        onChange={(e) => handleEditAreaPeople(area.id, parseFloat(e.target.value))}
                                                        className="rounded-md border border-gray-400 px-4 py-2 w-30"
                                                    />
                                                </div>
                                                <div className='grid gap-3 justify-right px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black'>
                                                    <div className='flex gap-2 justify-between'>
                                                        <div className='font-semibold mt-2'>修改電磁爐數量:</div>
                                                        <Input
                                                            type="number"
                                                            placeholder="修改電磁爐數量"
                                                            value={area.cookerNumber}
                                                            onChange={(e) => handleEditAreaCookerNumber(area.id, parseFloat(e.target.value))}
                                                            className="rounded-md border border-gray-400 px-4 py-2 w-30"
                                                        />
                                                    </div>
                                                    <div>
                                                        {errorLowerThanCooker && <p className="text-red-500 text-sm">{errorLowerThanCooker}</p>}
                                                    </div>
                                                </div>
                                                <div className='grid gap-3 justify-right px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black'>
                                                    <div className='flex gap-2 justify-between'>
                                                        <div className='font-semibold mt-2'>修改插座數量:</div>
                                                        <Input
                                                            type="number"
                                                            placeholder="修改插座數量"
                                                            value={area.socketNumber}
                                                            onChange={(e) => handleEditAreaSocketNumber(area.id, parseFloat(e.target.value))}
                                                            className="rounded-md border border-gray-400 px-4 py-2 w-30"
                                                        />
                                                    </div>
                                                    <div>
                                                        {errorLowerThanSocket && <p className="text-red-500 text-sm">{errorLowerThanSocket}</p>}
                                                    </div>
                                                </div>
                                                {/* <div className='flex gap-2 justify-right px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black'>
                                                    <div className='font-semibold'>修改插座數量:</div>
                                                    <Input
                                                        type="number"
                                                        placeholder="修改插座數量"
                                                        value={area.socketNumber}
                                                        onChange={(e) => handleEditAreaSocketNumber(area.id, parseFloat(e.target.value))}
                                                        className="rounded-md border border-gray-400 px-4 py-2 w-30"
                                                    />
                                                    {errorLowerThanSocket && <p className="text-red-500">{errorLowerThanSocket}</p>}
                                                </div> */}
                                            </AlertDialogHeader>
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
                                    <CardTitle className='font-medium text-xl flex justify-between'>
                                        <div className='flex gap-2'>
                                            <CopyPlus />
                                            新增裝置
                                        </div>
                                        <AlertDialog>
                                            <AlertDialogTrigger>
                                                <Button variant="outline" className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                                                    刪除區域
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        你確定要刪除此區域嗎?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        此操作無法復原。這將永久刪除您的資料，並從我們的伺服器中刪除您的數據。
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel onClick={handleCancelDeleteArea}>
                                                            取消
                                                    </AlertDialogCancel>
                                                    {/* <AlertDialogAction>
                                                        
                                                    </AlertDialogAction> */}
                                                    <Button onClick={() => confirmDeleteArea(area.id)}>
                                                            確認
                                                    </Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </CardTitle>
                                    <div className="border-b "></div>
                                </CardHeader>
                                <CardContent className="flex gap-14">
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Button variant="ghost"className="rounded-lg w-30 h-40 flex flex-col" >
                                            <Image src={cookerImage} alt="電磁爐" width={100} />
                                            <div className='pt-2 font-bold text-base'>電磁爐</div>
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                請輸入電磁爐編號
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                <input
                                                    type="text"
                                                    placeholder="..."
                                                    value={inputCookerValue}
                                                    onChange={handleInputCookerChange}
                                                    className="mb-4 rounded-md border border-gray-300 px-4 py-2"
                                                />
                                                {errorCookerMessage && <p className="text-red-500">{errorCookerMessage}</p>}
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel onClick={handleCancelClick}>
                                                取消
                                            </AlertDialogCancel>
                                            <Button onClick={() => handleConfirmClick(area.id, "cooker")}>
                                                確認
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Button variant="ghost"className="rounded-lg w-30 h-40 flex flex-col">
                                            <Image src={TVImage} alt="插座" width={100} />
                                            <div className='pt-2 font-bold text-base'>插座</div>
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                請輸入插座編號
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                <input
                                                    type="text"
                                                    placeholder="..."
                                                    value={inputSocketValue}
                                                    onChange={handleInputSocketChange}
                                                    className="mb-4 rounded-md border border-gray-300 px-4 py-2"
                                                />
                                                {errorSocketMessage && <p className="text-red-500">{errorSocketMessage}</p>}
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel onClick={handleCancelClick}>
                                                取消
                                            </AlertDialogCancel>
                                            <Button onClick={() => handleConfirmClick(area.id, "socket")}>
                                                確認
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                </CardContent>
                                <CardHeader className="gap-3">
                                    <CardTitle className='font-medium text-xl flex gap-2'>
                                        <SmartphoneCharging />
                                        目前裝置
                                    </CardTitle>
                                    <div className="border-b "></div>
                                </CardHeader>
                                <CardContent className="grid grid-flow-row-dense grid-cols-6">
                                {area.items.map((item) => (
                                    <div key={item.id} className=''>
                                        <div className='relative '>
                                        {item.type === 'cooker' && (
                                            <div>
                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                        <Button className="bg-white text-black hover:bg-white rounded-lg w-36 h-40 flex flex-col">
                                                            <Image src={cookerImage} alt="電磁爐" width={100} />
                                                            <div className='pt-2 font-bold text-base'>{item.name}</div>
                                                            <div className='pt-2 font-bold text-base'>編號: {item.uniqueId}</div>
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                        <AlertDialogDescription>
                                                            <div className='flex justify-right px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black text-base font-normal '>
                                                                <input type="text" placeholder="電磁爐名稱" value={item.name} 
                                                                    onChange={(e) => handleEditItemName(area.id,item.id,e.target.value)}
                                                                    className=" rounded-md border border-gray-300 px-4 py-2"/>
                                                            </div>
                                                            <div>
                                                                <div className="flex gap-2 justify-right px-4 py-6 items-center text-black h-10 rounded-md hover:bg-slate-100">
                                                                    電磁爐電源開關 :
                                                                    <Switch
                                                                        id="電磁爐電源開關"
                                                                        className="flex"
                                                                        checked={switchLevels[area.id]?.[item.id] || false}
                                                                        onCheckedChange={(newChecked: boolean) => handleSwitchClick(area.id, item.id, newChecked ? 1 : 0)}
                                                                    />
                                                                </div>
                                                            <div className="grid gap-4 justify-right px-4 py-6 h-30 text-black rounded-md hover:bg-slate-100">
                                                                <div className='flex gap-2'>
                                                                    火力狀況 :
                                                                    {fireLevels[area.id] && fireLevels[area.id][item.id] && (
                                                                        <div>
                                                                            {fireLevels[area.id][item.id]}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className='flex gap-2'>
                                                                    <Button onClick={() => handleButtonClick(area.id,item.id,1)} 
                                                                    className="h-8 w-8 rounded-full bg-white border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white">
                                                                        1
                                                                    </Button>
                                                                    <Button onClick={() => handleButtonClick( area.id, item.id, 2 )}
                                                                        className="h-8 w-8 rounded-full bg-white border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white">
                                                                        2
                                                                    </Button>
                                                                    <Button
                                                                        onClick={() => handleButtonClick( area.id, item.id, 3)}
                                                                        className="h-8 w-8 rounded-full bg-white border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white">
                                                                        3
                                                                    </Button>
                                                                    <Button onClick={() => handleButtonClick( area.id, item.id, 4)}
                                                                        className="h-8 w-8 rounded-full bg-white border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white">
                                                                        4
                                                                    </Button>
                                                                    <Button onClick={() => handleButtonClick( area.id, item.id, 5)}
                                                                        className="h-8 w-8 rounded-full bg-white border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white">
                                                                        5
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <div className="justify-right px-4 py-6 flex h-10 items-center rounded-md hover:bg-slate-100 text-black">
                                                                電磁爐錯誤代碼: /
                                                            </div>
                                                            <div className="justify-right px-4 py-6 flex h-10 items-center rounded-md hover:bg-slate-100 text-black">
                                                                可能原因: /
                                                            </div>
                                                            <div className="justify-right px-4 py-6 flex h-10 items-center rounded-md hover:bg-slate-100 text-black">
                                                                處理方法: /
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
                                                                你確定要刪除電磁爐嗎?
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
                                        )}
                                        {item.type === 'socket' && (
                                            <div>
                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                        <Button className="bg-white text-black hover:bg-white rounded-lg w-36 h-40 flex flex-col">
                                                            <Image src={TVImage} alt="插座" width={100} />
                                                            <div className='pt-2 font-bold text-base'>{item.name}</div>
                                                            <div className='pt-2 font-bold text-base'>編號: {item.uniqueId}</div>
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                        <AlertDialogDescription>
                                                            <div className='flex justify-right px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black text-base font-normal'>
                                                                <input type="text" placeholder="插座名稱" value={item.name} 
                                                                    onChange={(e) => handleEditItemName(area.id,item.id,e.target.value)}
                                                                    className="rounded-md border border-gray-300 px-4 py-2"/>
                                                            </div>
                                                            <div className="flex gap-2 justify-right px-4 py-6 items-center text-black h-10 rounded-md hover:bg-slate-100">
                                                                插座電源開關 :
                                                                <Switch
                                                                    id="插座電源開關"
                                                                    className="flex"
                                                                    checked={switchLevels[area.id]?.[item.id] || false}
                                                                    onCheckedChange={(newChecked: boolean) => handleSwitchClick(area.id, item.id, newChecked ? 1 : 0)}
                                                                />
                                                            </div>
                                                            <div className="justify-right px-4 py-6 flex h-10 items-center rounded-md hover:bg-slate-100 text-black">
                                                                插座電流: /
                                                            </div>
                                                            <div className="justify-right px-4 py-6 flex h-10 items-center rounded-md hover:bg-slate-100 text-black">
                                                                插座電壓: /
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
                                                                你確定要刪除插座嗎?
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
                                        )}
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
