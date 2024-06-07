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

function YourComponent() {
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
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">帳號名稱</TableHead>
                        <TableHead>{newAreaName || 'User Name'}</TableHead>
                        <TableHead> </TableHead>
                        <TableHead> </TableHead>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                {/* <div className="w-50 h-50">     */}
                                <Button
                                    variant="ghost"
                                    className="ml-12 h-14 w-14 rounded-full"
                                >
                                    {' '}
                                    {/* 使用 flex 布局使图标和名称水平排列 */}
                                    <PencilIcon className="h-6 w-6" />{' '}
                                    {/* 设置图标和名称之间的间距 */}
                                </Button>
                                {/* </div> */}
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        修改帳號名稱
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {/* 输入框用于输入新的区域名称 */}
                                        <input
                                            type="text"
                                            placeholder="User Name"
                                            value={newAreaName}
                                            onChange={(e) =>
                                                setNewAreaName(e.target.value)
                                            }
                                            className="mb-4 rounded-md border border-gray-300 px-4 py-2"
                                        />
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    {/* 将取消按钮的点击事件处理函数设为 handleCancel */}
                                    <AlertDialogCancel onClick={handleCancel}>
                                        取消
                                    </AlertDialogCancel>
                                    {/* “Continue”操作将触发 handleContinue 函数 */}
                                    <AlertDialogAction onClick={handleContinue}>
                                        儲存
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="w-[100px]">帳號密碼</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right"></TableCell>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                {/* <div className="w-50 h-50">     */}
                                <Button
                                    variant="ghost"
                                    className="ml-12 h-14 w-14 rounded-full"
                                >
                                    {' '}
                                    {/* 使用 flex 布局使图标和名称水平排列 */}
                                    <PencilIcon className="h-6 w-6" />{' '}
                                    {/* 设置图标和名称之间的间距 */}
                                </Button>
                                {/* </div> */}
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        修改密碼
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {/* 输入框用于输入新的区域名称 */}
                                        <input
                                            type="text"
                                            placeholder="Password"
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            className="mb-4 rounded-md border border-gray-300 px-4 py-2"
                                        />
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    {/* 将取消按钮的点击事件处理函数设为 handleCancel */}
                                    <AlertDialogCancel
                                        onClick={handleCancelPassword}
                                    >
                                        取消
                                    </AlertDialogCancel>
                                    {/* “Continue”操作将触发 handleContinue 函数 */}
                                    <AlertDialogAction
                                        onClick={handleContinuePassword}
                                    >
                                        儲存
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default YourComponent
