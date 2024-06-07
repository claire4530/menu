'use client'
import { useState } from 'react'

export default function SignUpPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match')
        } else {
            // 執行建立帳號的操作，這裡可以是一個 API 請求
            console.log('Sign up successful')
            location.href = '/dashboard'
            // 這裡可以導向登入頁面或其他頁面
        }
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="mb-6 text-3xl font-bold">Sign Up</h1>
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
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mb-4 rounded-md border border-gray-300 px-4 py-2"
            />
            <button
                onClick={handleSignUp}
                className="rounded-md bg-green-500 px-6 py-3 text-white hover:bg-green-600"
            >
                Sign Up
            </button>
        </div>
    )
}
