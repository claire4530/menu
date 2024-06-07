'use client'

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const dataYear = [
    {
        name: 'Jan',
        total: Math.floor(Math.random() * 100),
    },
    {
        name: 'Feb',
        total: Math.floor(Math.random() * 100),
    },
    {
        name: 'Mar',
        total: Math.floor(Math.random() * 100),
    },
    {
        name: 'Apr',
        total: Math.floor(Math.random() * 100),
    },
    {
        name: 'May',
        total: Math.floor(Math.random() * 100),
    },
    {
        name: 'Jun',
        total: Math.floor(Math.random() * 100),
    },
    {
        name: 'Jul',
        total: Math.floor(Math.random() * 100),
    },
    {
        name: 'Aug',
        total: Math.floor(Math.random() * 100),
    },
    {
        name: 'Sep',
        total: Math.floor(Math.random() * 100),
    },
    {
        name: 'Oct',
        total: Math.floor(Math.random() * 100),
    },
    {
        name: 'Nov',
        total: Math.floor(Math.random() * 100),
    },
    {
        name: 'Dec',
        total: Math.floor(Math.random() * 100),
    },
]

interface MonthData {
    name: string
    total: number
}

// 獲取當前日期
const currentDate = new Date()
// 獲取當前月份
const currentMonth = currentDate.getMonth() + 1
// 獲取當前月份的第一天
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentMonth - 1, 1)
// 獲取下個月的第一天
const firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentMonth, 1)
// 獲取當前月份的最後一天
const lastDayOfMonth = new Date(firstDayOfNextMonth.getTime() - 1)

const dataMonth: MonthData[] = []
const daysInMonth = lastDayOfMonth.getDate() // Assuming every month has 31 days

const dataDay: MonthData[] = []
const hoursInDay = 24

for (let i = 1; i <= daysInMonth; i++) {
    const day = i < 10 ? `0${i}` : `${i}` // Add leading zero if day is single digit
    dataMonth.push({
        name: `${day}`, // Assuming day is represented as "01", "02", ..., "31"
        total: Math.floor(Math.random() * 10),
    })
}

for (let i = 1; i <= hoursInDay; i++) {
    const hour = i < 10 ? `0${i}` : `${i}` // Add leading zero if day is single digit
    dataDay.push({
        name: `${hour}`, // Assuming day is represented as "01", "02", ..., "31"
        total: Math.floor(Math.random()*6),
    })
}

export function CarbonLineChartYear() {
    return (
        <ResponsiveContainer width={400} height={320} className="mt-8 " >
            <LineChart data={dataYear}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    interval={0} 
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                    dx={-20}
                />
                <Line
                    type="monotone"
                    dataKey="total"
                    stroke="currentColor"
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export function CarbonLineChartDay() {
    return (
        <ResponsiveContainer width={380} height={320} className="mt-8">
            <LineChart data={dataDay}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Line
                    type="monotone"
                    dataKey="total"
                    stroke="currentColor"
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export function CarbonLineChartMonth() {
    return (
        <ResponsiveContainer width={400} height={320} className="mt-8">
            <LineChart data={dataMonth}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                    dx={-20}
                />
                <Line
                    type="monotone"
                    dataKey="total"
                    stroke="currentColor"
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
