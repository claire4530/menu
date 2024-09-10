import * as React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

interface PowerUsage {
    id: number
    powerName: string
    powerTime: string
    watt: number
}

export function CarbonDay() {

    const [powerUsageData, setPowerUsageData] = useState<PowerUsage[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/power-usage`);
            const result = await response.json();

            setPowerUsageData(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const calculateTotalWatt = (timeFrame: string) => {
        const now = dayjs(); // 当前时间
    
        const filteredData = powerUsageData.filter(item => {
            const itemDate = dayjs(item.powerTime); // 转换数据时间为dayjs对象
    
            if (timeFrame === 'dayUsage') {
                // 过滤出今天的数据
                return itemDate.isSame(now, 'day');
            } else if (timeFrame === 'monthUsage') {
                // 过滤出当前月的数据
                return itemDate.isSame(now, 'month');
            } else if (timeFrame === 'yearUsage') {
                // 过滤出当前年的数据
                return itemDate.isSame(now, 'year');
            } else if (timeFrame === 'yesterdayUsage') {
                // 过滤出昨天的数据
                return itemDate.isSame(now.subtract(1, 'day'), 'day');
            } else if (timeFrame === 'lastMonthUsage') {
                // 过滤出上个月的数据
                return itemDate.isSame(now.subtract(1, 'month'), 'month');
            } else if (timeFrame === 'lastYearUsage') {
                // 过滤出去年的数据
                return itemDate.isSame(now.subtract(1, 'year'), 'year');
            }
            return false;
        });
    
        return filteredData.reduce((total, item) => total + item.watt, 0);
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 900000); // 每三秒抓取一次資料

        return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);


    // 計算碳排放量
    const carbonEmission = (calculateTotalWatt('dayUsage')/1000) * 0.494

    // 计算昨日与今日的碳排放增减
    const yesterdayTotalWatt = calculateTotalWatt('yesterdayUsage');
    const todayTotalWatt = calculateTotalWatt('dayUsage');
    const emissionChange = ((todayTotalWatt - yesterdayTotalWatt) / (yesterdayTotalWatt || 1)) * 100;

    // 判斷碳排放增減的文字描述
    const changeDescription = emissionChange > 0 ? '增加' : '減少'
    const today = new Date()
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`

    return (
        <>
            <div className="p-1">
                <Card className="">
                    <CardHeader>
                        <div className="flex gap-4">
                            <CardTitle>本日碳排放分析</CardTitle>
                            <CardDescription className="pt-1">
                                {formattedDate}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        您今日產生了{carbonEmission.toFixed(3)}
                        公斤的二氧化碳，相較於昨日
                        {changeDescription}了{' '}
                        {Math.abs(emissionChange).toFixed(1)}% !
                    </CardContent>
                </Card>
                <Card className="mt-10">
                    <CardHeader>
                        <CardTitle>什麼是碳排放？ </CardTitle>
                        <CardDescription className="pt-2">
                            發電的燃燒行為產生二氧化碳（CO2）
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        根據經濟部能源局112年度最新計算結果：每1度電會產生0.494公斤的二氧化碳
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export function CarbonMonth() {

    const [powerUsageData, setPowerUsageData] = useState<PowerUsage[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/power-usage`);
            const result = await response.json();

            setPowerUsageData(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const calculateTotalWatt = (timeFrame: string) => {
        const now = dayjs(); // 当前时间
    
        const filteredData = powerUsageData.filter(item => {
            const itemDate = dayjs(item.powerTime); // 转换数据时间为dayjs对象
    
            if (timeFrame === 'dayUsage') {
                // 过滤出今天的数据
                return itemDate.isSame(now, 'day');
            } else if (timeFrame === 'monthUsage') {
                // 过滤出当前月的数据
                return itemDate.isSame(now, 'month');
            } else if (timeFrame === 'yearUsage') {
                // 过滤出当前年的数据
                return itemDate.isSame(now, 'year');
            } else if (timeFrame === 'yesterdayUsage') {
                // 过滤出昨天的数据
                return itemDate.isSame(now.subtract(1, 'day'), 'day');
            } else if (timeFrame === 'lastMonthUsage') {
                // 过滤出上个月的数据
                return itemDate.isSame(now.subtract(1, 'month'), 'month');
            } else if (timeFrame === 'lastYearUsage') {
                // 过滤出去年的数据
                return itemDate.isSame(now.subtract(1, 'year'), 'year');
            }
            return false;
        });
    
        return filteredData.reduce((total, item) => total + item.watt, 0);
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 900000); // 每三秒抓取一次資料

        return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);


    // 計算碳排放量
    const carbonEmission = (calculateTotalWatt('monthUsage')/1000) * 0.494

    const lastYearTotalWatt = calculateTotalWatt('lastMonthUsage');
    const thisYearTotalWatt = calculateTotalWatt('monthUsage');
    const emissionChange = ((thisYearTotalWatt - lastYearTotalWatt) / (lastYearTotalWatt || 1)) * 100;

    // 判斷碳排放增減的文字描述
    const changeDescription = emissionChange > 0 ? '增加' : '減少'
    const today = new Date()
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`

    return (
        <>
            <div className="p-1">
                <Card className="">
                    <CardHeader>
                        <div className="flex gap-4">
                            <CardTitle>本月碳排放分析</CardTitle>
                            <CardDescription className="pt-1">
                                {formattedDate}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        您這個月產生了{carbonEmission.toFixed(3)}
                        公斤的二氧化碳，相較於上個月
                        {changeDescription}了{' '}
                        {Math.abs(emissionChange).toFixed(1)}% !
                    </CardContent>
                </Card>
                <Card className="mt-10">
                    <CardHeader>
                        <CardTitle>什麼是碳排放？ </CardTitle>
                        <CardDescription className="pt-2">
                            發電的燃燒行為產生二氧化碳（CO2）
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        根據經濟部能源局112年度最新計算結果：每1度電會產生0.494公斤的二氧化碳
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export function CarbonYear() {

    const [powerUsageData, setPowerUsageData] = useState<PowerUsage[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/power-usage`);
            const result = await response.json();

            setPowerUsageData(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const calculateTotalWatt = (timeFrame: string) => {
        const now = dayjs(); // 当前时间
    
        const filteredData = powerUsageData.filter(item => {
            const itemDate = dayjs(item.powerTime); // 转换数据时间为dayjs对象
    
            if (timeFrame === 'dayUsage') {
                // 过滤出今天的数据
                return itemDate.isSame(now, 'day');
            } else if (timeFrame === 'monthUsage') {
                // 过滤出当前月的数据
                return itemDate.isSame(now, 'month');
            } else if (timeFrame === 'yearUsage') {
                // 过滤出当前年的数据
                return itemDate.isSame(now, 'year');
            } else if (timeFrame === 'yesterdayUsage') {
                // 过滤出昨天的数据
                return itemDate.isSame(now.subtract(1, 'day'), 'day');
            } else if (timeFrame === 'lastMonthUsage') {
                // 过滤出上个月的数据
                return itemDate.isSame(now.subtract(1, 'month'), 'month');
            } else if (timeFrame === 'lastYearUsage') {
                // 过滤出去年的数据
                return itemDate.isSame(now.subtract(1, 'year'), 'year');
            }
            return false;
        });
    
        return filteredData.reduce((total, item) => total + item.watt, 0);
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 900000); // 每三秒抓取一次資料

        return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);


    // 計算碳排放量
    const carbonEmission = (calculateTotalWatt('yearUsage')/1000) * 0.494

    const lastYearTotalWatt = calculateTotalWatt('lastYearUsage');
    const thisYearTotalWatt = calculateTotalWatt('yearUsage');
    const emissionChange = ((thisYearTotalWatt - lastYearTotalWatt) / (lastYearTotalWatt || 1)) * 100;

    // 判斷碳排放增減的文字描述
    const changeDescription = emissionChange > 0 ? '增加' : '減少'
    const today = new Date()
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`

    return (
        <>
            <div className="p-1">
                <Card className="">
                    <CardHeader>
                        <div className="flex gap-4">
                            <CardTitle>本年碳排放分析</CardTitle>
                            <CardDescription className="pt-1">
                                {formattedDate}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        您今年產生了{carbonEmission.toFixed(3)}
                        公斤的二氧化碳，相較於去年
                        {changeDescription}了{' '}
                        {Math.abs(emissionChange).toFixed(1)}% !
                    </CardContent>
                </Card>
                <Card className="mt-10">
                    <CardHeader>
                        <CardTitle>什麼是碳排放？ </CardTitle>
                        <CardDescription className="pt-2">
                            發電的燃燒行為產生二氧化碳（CO2）
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        根據經濟部能源局112年度最新計算結果：每1度電會產生0.494公斤的二氧化碳
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
