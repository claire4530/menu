'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TotalRevenue from './components/total-revenue'
import MealTime from './components/meal-time'
import BusinessTime from './components/business-hours'
import TotalRevenueBarChart from './components/total-revenue-bar-chart'
import BestSellers from './components/best-sellers'
import TotalPowerUsage from './components/total-power-usage'
import ElectricityBill from './components/electric-bill'
import TotalPowerChart from './components/total-power-chart'
import TotalPowerCondition from './components/total-power-condition'
import CarbonAnalysis from './components/carbon-analysis'

export default function DashboardPage() {

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <h2 className="text-3xl font-bold tracking-tight">
                            店鋪管理
                        </h2>
                    </div>
                </div>
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2"></div>
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="overview">營業管理</TabsTrigger>
                            <TabsTrigger value="analytics">
                                用電量管理
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-3">
                                <TotalRevenue />
                                <MealTime />
                                <BusinessTime />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                <TotalRevenueBarChart />
                                <BestSellers />
                            </div>
                        </TabsContent>
                        <TabsContent value="analytics" className="space-y-4">
                            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-2">
                                <TotalPowerUsage />
                                <ElectricityBill />
                            </div>
                            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                                <TotalPowerChart />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                <TotalPowerCondition />
                                <CarbonAnalysis />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
