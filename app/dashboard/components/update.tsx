'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TriangleAlert, SquareCheck } from 'lucide-react'
import { PencilIcon } from '@heroicons/react/24/outline'
import UserChange from './user'

interface UserChangeProps {
    onUpdate: (account: string, password: string) => void;
}

interface Business {
    areaName: string
    account: string
    password: string
}

export const Update: React.FC = () => {

    const [areaName, setAreaName] = useState<string>('');
    const [account, setAccount] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/business`)
            const result: Business[] = await response.json()
            const { areaName, account, password } = result[0] // 假設只有一組資料
            setAreaName(areaName)
            setAccount(account)
            setPassword(password)
            
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    // 回调函数，用于更新account和password
    const handleUpdate = (updatedName: string, updatedAccount: string, updatedPassword: string) => {
        setAreaName(updatedName);
        setAccount(updatedAccount);
        setPassword(updatedPassword);
    };

    useEffect(() => {
        fetchData()
    }, [apiUrl])

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between'>
                    <CardTitle>個人資料</CardTitle>
                    <UserChange onUpdate={handleUpdate}/>
                </div>
            </CardHeader>
            <CardContent>
                <p>店鋪名稱 : {areaName}</p>
            </CardContent>
            <CardContent>
                <p>帳號名稱 : {account}</p>
            </CardContent>
            <CardContent>
                <p>帳號密碼 : {password}</p>
            </CardContent>
        </Card>
    )
}

export default Update
