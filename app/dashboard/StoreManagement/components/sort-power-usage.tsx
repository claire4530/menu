import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import dayjs from 'dayjs';
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
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
import { ScrollArea } from '@/components/ui/scroll-area'

interface PowerUsage {
    id: number;
    powerName: string;
    powerTime: string;
    watt: number;
}

async function fetchPowerData(apiUrl: string, filterFn: (usage: PowerUsage) => boolean) {
    const response = await fetch(`${apiUrl}/api/power-usage`);
    const result: PowerUsage[] = await response.json();
    const powerData: { [key: string]: number } = {};

    result.filter(filterFn).forEach(usage => {
        if (!powerData[usage.powerName]) {
            powerData[usage.powerName] = 0;
        }
        powerData[usage.powerName] += usage.watt;
    });

    return Object.entries(powerData)
        .map(([name, watt]) => ({ name, watt }))
        .sort((a, b) => b.watt - a.watt); // 按照用电量降序排序
}

export function RecentPowerDay() {
    const [dataDay, setDataDay] = useState<{ name: string; watt: number }[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    useEffect(() => {
        const fetchData = async () => {
            const today = dayjs().format('YYYY-MM-DD');
            const powerData = await fetchPowerData(apiUrl, usage =>
                dayjs(usage.powerTime).format('YYYY-MM-DD') === today
            );
            setDataDay(powerData);
        };

        fetchData();
        const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次数据
        return () => clearInterval(intervalId); // 清除定时器
    }, [apiUrl]);

    return (
        <>
            <div className="flex ">
                <PieChart width={340} height={340}>
                    <Pie
                        data={dataDay}
                        dataKey="watt"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                    >
                        {dataDay.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}/>
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number, name) => [`${(value / dataDay.reduce((acc, cur) => acc + cur.watt, 0) * 100).toFixed(2)}%`, name, ]}
                    />
                </PieChart>
                <div className="flex ">
                    <div className="space-y-8">
                        {dataDay.slice(0, 5).map((item) => (
                            <div key={item.name} className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{item.name.slice(-1)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 flex gap-4">
                                    <p className="text-base font-medium ">{item.name} :</p>
                                    <div className="font-medium">
                                        {item.watt}
                                        <span className="ml-1 text-sm font-bold">kw</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-grow justify-end ">
                <Dialog>
                    <DialogTrigger>
                        <Button variant="outline">查看更多</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>全部電磁爐用電情況</DialogTitle>
                            <DialogDescription>
                                <ScrollArea className="h-[320px] w-[450px] p-4">
                                <div className="space-y-8">
                                        {dataDay.map((item) => (
                                            <div key={item.name} className="flex items-center">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback>{item.name.slice(-1)}</AvatarFallback>
                                                </Avatar>
                                                <div className="ml-4 flex gap-4">
                                                    <p className="text-base font-medium ">{item.name} :</p>
                                                    <div className="font-medium">
                                                        {item.watt.toFixed(1)}
                                                        <span className="ml-1 text-sm font-bold">w</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
export function RecentPowerMonth() {
    const [dataMonth, setDataMonth] = useState<{ name: string; watt: number }[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    useEffect(() => {
        const fetchData = async () => {
            const thisMonth = dayjs().format('YYYY-MM');
            const powerData = await fetchPowerData(apiUrl, usage =>
                dayjs(usage.powerTime).format('YYYY-MM') === thisMonth
            );
            setDataMonth(powerData);
        };

        fetchData();
        const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次数据
        return () => clearInterval(intervalId); // 清除定时器
    }, [apiUrl]);

    return (
        <>
            <div className="flex ">
                <PieChart width={340} height={340}>
                    <Pie
                        data={dataMonth}
                        dataKey="watt"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                    >
                        {dataMonth.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}/>
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number, name) => [`${(value / dataMonth.reduce((acc, cur) => acc + cur.watt, 0) * 100).toFixed(2)}%`, name, ]}
                    />
                </PieChart>
                <div className="flex ">
                    <div className="space-y-8">
                        {dataMonth.slice(0, 5).map((item) => (
                            <div key={item.name} className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{item.name.slice(-1)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 flex gap-4">
                                    <p className="text-base font-medium ">{item.name} :</p>
                                    <div className="font-medium">
                                        {item.watt}
                                        <span className="ml-1 text-sm font-bold">kw</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-grow justify-end ">
                <Dialog>
                    <DialogTrigger>
                        <Button variant="outline">查看更多</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>全部電磁爐用電情況</DialogTitle>
                            <DialogDescription>
                                <ScrollArea className="h-[320px] w-[450px] p-4">
                                <div className="space-y-8">
                                        {dataMonth.map((item) => (
                                            <div key={item.name} className="flex items-center">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback>{item.name.slice(-1)}</AvatarFallback>
                                                </Avatar>
                                                <div className="ml-4 flex gap-4">
                                                    <p className="text-base font-medium ">{item.name} :</p>
                                                    <div className="font-medium">
                                                        {item.watt.toFixed(1)}
                                                        <span className="ml-1 text-sm font-bold">w</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
export function RecentPowerYear() {
    const [dataYear, setDataYear] = useState<{ name: string; watt: number }[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    useEffect(() => {
        const fetchData = async () => {
            const thisYear = dayjs().format('YYYY');
            const powerData = await fetchPowerData(apiUrl, usage =>
                dayjs(usage.powerTime).format('YYYY') === thisYear
            );
            setDataYear(powerData);
        };

        fetchData();
        const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次数据
        return () => clearInterval(intervalId); // 清除定时器
    }, [apiUrl]);

    return (
        <>
            <div className="flex ">
                <PieChart width={340} height={340}>
                    <Pie
                        data={dataYear}
                        dataKey="watt"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                    >
                        {dataYear.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}/>
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number, name) => [`${(value / dataYear.reduce((acc, cur) => acc + cur.watt, 0) * 100).toFixed(2)}%`, name, ]}
                    />
                </PieChart>
                <div className="flex ">
                    <div className="space-y-8">
                        {dataYear.slice(0, 5).map((item) => (
                            <div key={item.name} className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{item.name.slice(-1)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 flex gap-4">
                                    <p className="text-base font-medium ">{item.name} :</p>
                                    <div className="font-medium">
                                        {item.watt}
                                        <span className="ml-1 text-sm font-bold">kw</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-grow justify-end ">
                <Dialog>
                    <DialogTrigger>
                        <Button variant="outline">查看更多</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>全部電磁爐用電情況</DialogTitle>
                            <DialogDescription>
                                <ScrollArea className="h-[320px] w-[450px] p-4">
                                <div className="space-y-8">
                                        {dataYear.map((item) => (
                                            <div key={item.name} className="flex items-center">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback>{item.name.slice(-1)}</AvatarFallback>
                                                </Avatar>
                                                <div className="ml-4 flex gap-4">
                                                    <p className="text-base font-medium ">{item.name} :</p>
                                                    <div className="font-medium">
                                                        {item.watt.toFixed(1)}
                                                        <span className="ml-1 text-sm font-bold">w</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
