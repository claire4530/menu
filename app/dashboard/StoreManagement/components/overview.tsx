'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const dataYear = [
    {
        name: 'Jan',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Feb',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Mar',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Apr',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'May',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Jun',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Jul',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Aug',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Sep',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Oct',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Nov',
        total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
        name: 'Dec',
        total: Math.floor(Math.random() * 5000) + 1000,
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
// 格式化日期為字符串，例如：4/1 - 4/30
const formattedDateRange = `${
    firstDayOfMonth.getMonth() + 1
}/${firstDayOfMonth.getDate()} - 
${lastDayOfMonth.getMonth() + 1}/${lastDayOfMonth.getDate()}`

const dataMonth: MonthData[] = []
const daysInMonth = lastDayOfMonth.getDate() // Assuming every month has 31 days

const dataDay: MonthData[] = []
const hoursInDay = 24

for (let i = 1; i <= daysInMonth; i++) {
    const day = i < 10 ? `0${i}` : `${i}` // Add leading zero if day is single digit
    dataMonth.push({
        name: `${day}`, // Assuming day is represented as "01", "02", ..., "31"
        total: Math.floor(Math.random() * 5000) + 1000,
    })
}

for (let i = 1; i <= hoursInDay; i++) {
    const hour = i < 10 ? `0${i}` : `${i}` // Add leading zero if day is single digit
    dataDay.push({
        name: `${hour}`, // Assuming day is represented as "01", "02", ..., "31"
        total: Math.floor(Math.random() * 5000) + 1000,
    })
}

export function OverviewYear() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dataYear}>
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
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export function OverviewMonth() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dataMonth}>
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
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export function OverviewDay() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={dataDay}>
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
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}
