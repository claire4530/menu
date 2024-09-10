'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'

interface PowerUsage {
    account: string
    password: string
}

export default function Page() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [powerUsageData, setPowerUsageData] = useState<PowerUsage[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/business`);
            const result = await response.json();

            setPowerUsageData(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleLogin = () => {
        // 假設登入成功
        if (username === powerUsageData[0].account && password === powerUsageData[0].password) {
            console.log('Login successful')
            location.href = '/dashboard' //跳轉首頁
        } else {
            // 登入失敗
            setError('Incorrect username or password')
        }
    }

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次資料

        return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="mb-6 text-3xl font-bold">Login</h1>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-4 rounded-md border border-gray-300 px-4 py-2 w-[200px]"
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 rounded-md border border-gray-300 px-4 py-2 w-[200px]"
            />
            <Button
                onClick={handleLogin}
                className="rounded-md bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
            >
                Login
            </Button>
        </div>
    )
}
