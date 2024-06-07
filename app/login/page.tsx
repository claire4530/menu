'use client'
import { useState } from 'react'

export default function Page() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = () => {
        // 假設登入成功
        if (username === 'a' && password === '123') {
            console.log('Login successful')
            location.href = '/dashboard' //跳轉首頁
        } else {
            // 登入失敗
            setError('Incorrect username or password')
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="mb-6 text-3xl font-bold">Login</h1>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-4 rounded-md border border-gray-300 px-4 py-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 rounded-md border border-gray-300 px-4 py-2"
            />
            <button
                onClick={handleLogin}
                className="rounded-md bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
            >
                Login
            </button>
        </div>
    )
}
