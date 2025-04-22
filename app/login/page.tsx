'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function Page() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    
    const handleLogin = () => {
        // 假設登入成功
        if (password === "123") {
            console.log('Login successful')
            location.href = '/dashboard/DiningArea' //跳轉首頁
        } else {
            // 登入失敗
            setError('密碼錯誤')
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <Card className="w-[320px]">
                <CardHeader>
                    <CardTitle className="text-center text-xl">櫃台系統</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    
                    <label className="w-full text-left font-semibold">密碼</label>
                    <Input
                        type="password"
                        placeholder="輸入密碼"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2"
                    />
                    <div className="h-[24px] text-center text-red-500">
                        {error && <p>{error}</p>}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        onClick={handleLogin}
                        className="w-full rounded-md bg-sky-700 px-6 py-3 text-white hover:bg-sky-800"
                    >
                        登入
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
