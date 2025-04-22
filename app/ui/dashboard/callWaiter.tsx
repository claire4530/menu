'use client'
import React, { useState, useEffect } from 'react';
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
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { BellIcon, BellAlertIcon } from '@heroicons/react/24/outline'
import { UserRound } from 'lucide-react';

interface Area {
    tableNumber: string,
    areas_id: number
    state : string
}

function convertToLocalISOString(date: Date): string {
    const tzOffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, -1); // Adjust the date and remove the 'Z' at the end
    return localISOTime;
}

async function addState(tableNumber: string, AlerTime: Date, areas_id: number): Promise<void> {

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    const formattedTime = convertToLocalISOString(AlerTime);
    await fetch(`${apiUrl}/api/add-notifys`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableNumber, AlerTime: formattedTime, areas_id }),
        }
    )
    

}

async function updateState(notify: string, tableNumber: string): Promise<void> {

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    await fetch(`${apiUrl}/api/edit-table-notify`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notify, tableNumber }),
        }
    )
    

}

const handleConfirm = (tableNumber: string, areas_id: number) => {
    const isoTime = new Date();
    addState(tableNumber, isoTime, areas_id)
    updateState('待處理', tableNumber)
}

interface DiningProps {
    id: string; // 目標餐桌的編號
}

interface TableRemainingTimeProps {
    tableNumber: string;
    notify: string; // 通知狀態
    areas_id: number; // 桌號id
}
const Notify : React.FC<DiningProps> = ({ id }) => {

    const [notify, setNotify] = useState<string>(''); // 通知狀態
    const [areas_id, setAreas_id] = useState<number>(0); // 桌號id
    const [error, setError] = useState<string | null>(null); // 儲存錯誤訊息

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/areas`); // 修正字串插值
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result: TableRemainingTimeProps[] = await response.json();
            const tableData = result.find((item) => item.tableNumber === id); // 查找對應的餐桌

            if (tableData) {
                setAreas_id(tableData.areas_id);
                setNotify(tableData.notify);
            } else {
                setError('Table not found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
        }
    };

    useEffect(() => {
        fetchData(); // 初始加载数据
        // const interval = setInterval(fetchData, 1000); 

        // return () => clearInterval(interval); 
    }, [id]);
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className=''>
                    {notify === '已處理' ? (
                        <div className='hover:bg-[#71503e] hover:text-white rounded-lg h-[48px] flex gap-2'>
                            <BellIcon className="ml-3 flex-end w-6" />
                            <p className='font-semibold mt-3 text-sm'>呼叫服務員</p>
                        </div>
                    ) : (
                        <div className='bg-[#71503e] text-white rounded-lg h-[48px] flex gap-2 hover:bg-[#534D41]'>
                            <BellAlertIcon className="ml-3 flex-end w-6 " />
                            <p className='font-semibold mt-3 text-sm'>服務員已在路上</p>
                        </div>
                    )}
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[400px] h-[160px]">
                <div>
                    {notify === '已處理' ? (
                        <div className="grid gap-10">
                            <AlertDialogTitle className="text-center">
                                確定要呼叫服務員嗎?
                            </AlertDialogTitle>
                            <div className='flex justify-center gap-4'>
                                <AlertDialogCancel>
                                    &nbsp;&nbsp;取消&nbsp;&nbsp;
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                    onClick={() => handleConfirm( id, areas_id ) }
                                >
                                    &nbsp;&nbsp;確定&nbsp;&nbsp;
                                </AlertDialogAction>
                            </div>
                        </div>
                    ) : (
                        <div>
                                <AlertDialogTitle className="flex gap-2 mt-4 ml-6">
                                    <UserRound />
                                    服務員已經在路上了...
                                </AlertDialogTitle>
                                <div  className="mt-6 flex justify-end">
                                    <AlertDialogCancel>
                                        &nbsp;&nbsp;取消&nbsp;&nbsp;
                                    </AlertDialogCancel>
                                </div>
                        </div>
                    )}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Notify
