'use client'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { PencilIcon } from '@heroicons/react/24/outline'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

export function YourComponent() {
    //帳號
    const [newAreaName, setNewAreaName] = useState('') // 用于存储新的区域名称的状态
    const [previousAreaName, setPreviousAreaName] = useState('') // 用于存储上一次的区域名称

    const handleContinue = () => {
        // 在此处添加您想要执行的“Continue”操作，例如保存新的区域名称等
        console.log('New area name:', newAreaName)
        // 保存当前名称作为上一次的名称
        setPreviousAreaName(newAreaName)
    }

    const handleCancel = () => {
        // 取消按钮点击后恢复到上一次的名称
        setNewAreaName(previousAreaName)
    }
    //密碼
    const [newPassword, setNewPassword] = useState('') // 用于存储新的区域名称的状态
    const [previousPassword, setPreviousPassword] = useState('') // 用于存储上一次的区域名称

    const handleContinuePassword = () => {
        // 在此处添加您想要执行的“Continue”操作，例如保存新的区域名称等
        console.log('New Password:', newPassword)
        // 保存当前名称作为上一次的名称
        setPreviousPassword(newPassword)
    }

    const handleCancelPassword = () => {
        // 取消按钮点击后恢复到上一次的名称
        setNewPassword(previousPassword)
    }
    return (
        <div className='flex justify-between'>
            <div className='font-bold text-4xl'>{newAreaName||"120"}<span className='font-medium text-lg ml-4'>min</span></div>
            
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        className="h-14 w-14 rounded-full"
                    >
                        <PencilIcon className="h-6 w-6" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader className='gap-4'>
                        <AlertDialogTitle>
                            修改用餐時間
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <input
                                type="number"
                                placeholder="modify.."
                                value={newAreaName}
                                onChange={(e) =>
                                    setNewAreaName(e.target.value)
                                }
                                className="mb-4 rounded-md border border-gray-300 px-4 py-2"
                            />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>
                            取消
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleContinue}>
                            儲存
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
