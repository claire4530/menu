import * as React from 'react'
import {
    CarbonLineChartMonth,
    CarbonLineChartDay,
    CarbonLineChartYear,
} from './carbon-LineChart'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

export function CarbonDay() {
    const data = [
        { date: "2024-04-21", value: 100},
        { date: "2024-04-20", value: 125},
        { date: "2024-04-19", value: 209},
    ];

    // 計算碳排放量
    const carbonEmission = data.reduce((total, item) => total + item.value, 0) * 0.554;

    // 計算昨日與今日的碳排放增減
    const yesterdayValue = data[1].value;
    const todayValue = data[0].value;
    const emissionChange = ((todayValue - yesterdayValue) / yesterdayValue) * 100;

    // 判斷碳排放增減的文字描述
    const changeDescription = emissionChange > 0 ? "增加" : "減少";
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    
    //圖表
    const [selectedCharts, setSelectedCharts] = React.useState('dayMoney')

    const handleChangeCharts = (value: string) => {
        setSelectedCharts(value)
        
    }

        // 獲取當前日期
    const currentDate = new Date()
    // 獲取當前月份
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear();

    return (
        <>
        <Carousel className="h-[340px]">
            <CarouselContent>
                <CarouselItem>
                    <div className="p-1">
                    <Card className="">
                        <CardHeader>
                            <div className='flex gap-4'>
                                <CardTitle>本日碳排放分析</CardTitle>
                                <CardDescription className="pt-1">
                                    {formattedDate}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>                  
                            您今日產生了{carbonEmission.toFixed(3)}公斤的二氧化碳，相較於昨日{changeDescription}了 {Math.abs(emissionChange).toFixed(1)}% !
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
                </CarouselItem>
                <CarouselItem>
                    <Card className="">
                        <CarbonLineChartDay />
                    </Card>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className='ml-8'/>
            <CarouselNext className='mr-8'/>
        </Carousel>
        </>
    );
}

export function CarbonMonth() {
    const data = [
        { date: "2024-04", value: 4100 },
        { date: "2024-05", value: 9000 },
        { date: "2024-06", value: 7125 },
    ];

    // 獲取當前日期
    const today = new Date();
    const currentYear = today.getFullYear().toString();
    const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const currentMonthData = data.find(item => item.date === `${currentYear}-${currentMonth}`);
    const lastMonthData = data.find(item => {
        const [year, month] = item.date.split("-");
        const lastMonth = (today.getMonth() === 0 ? 12 : today.getMonth()).toString().padStart(2, '0');
        const lastYear = today.getMonth() === 0 ? (today.getFullYear() - 1).toString() : currentYear;
        return year === lastYear && month === lastMonth;
    });

    // 檢查數據是否存在
    const currentMonthValue = currentMonthData ? currentMonthData.value : 0;
    const lastMonthValue = lastMonthData ? lastMonthData.value : 0;

    // 計算碳排放增減百分比
    const emissionChange = lastMonthValue ? ((currentMonthValue - lastMonthValue) / lastMonthValue) * 100 : 0;

    // 判斷碳排放增減的文字描述
    const changeDescription = emissionChange > 0 ? "增加" : "減少";

    return (
        <>
        <Carousel className="h-[340px]">
            <CarouselContent>
                <CarouselItem>
                    <div className="p-1">
                    <Card className="">
                        <CardHeader>
                            <div className='flex gap-4'>
                                <CardTitle>本月碳排放分析</CardTitle>
                                <CardDescription className="pt-1">
                                    {currentMonth}月
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>                  
                            您這個月產生了{currentMonthValue .toFixed(3)}公斤的二氧化碳，相較於上個月{changeDescription}了 {Math.abs(emissionChange).toFixed(1)}% !
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
                </CarouselItem>
                <CarouselItem>
                    <Card className="">
                        <CarbonLineChartMonth />
                    </Card>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className='ml-8'/>
            <CarouselNext className='mr-8'/>
        </Carousel>
        </>
    );
}

export function CarbonYear() {
    const data = [
        { date: "2024", value: 89125 },
        { date: "2023", value: 64100 },
        { date: "2022", value: 121209 },
    ];

    // 判斷碳排放增減的文字描述
    const today = new Date();

    // 獲取當前年份
    const currentYear = today.getFullYear().toString();
    const lastYear = (parseInt(currentYear) - 1).toString();

    // 計算今年和去年的碳排放量
    const currentYearData = data.find(item => item.date === currentYear);
    const lastYearData = data.find(item => item.date === lastYear);

    // 檢查數據是否存在
    const currentYearValue = currentYearData ? currentYearData.value : 0;
    const lastYearValue = lastYearData ? lastYearData.value : 0;

    // 計算碳排放增減百分比
    const emissionChange = ((currentYearValue - lastYearValue) / lastYearValue) * 100;

    // 判斷碳排放增減的文字描述
    const changeDescription = emissionChange > 0 ? "增加" : "減少";
    return (
        <>
            <Carousel className="h-[340px]">
                <CarouselContent>
                    <CarouselItem>
                        <div className="p-1">
                            <Card className="">
                                <CardHeader>
                                    <div className='flex gap-4'>
                                        <CardTitle>本年碳排放分析</CardTitle>
                                        <CardDescription className="pt-1">
                                            {currentYear}年
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    您今年產生了{(currentYearValue * 0.494).toFixed(3)}公斤的二氧化碳，相較於去年{changeDescription}了 {Math.abs(emissionChange).toFixed(1)}% !
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
                    </CarouselItem>
                    <CarouselItem>
                        <Card className="p-0">
                            <div className=''>
                                <CarbonLineChartYear />
                            </div>
                        </Card>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className='ml-8'/>
                <CarouselNext className='mr-8'/>
            </Carousel>
        </>
    );
}
