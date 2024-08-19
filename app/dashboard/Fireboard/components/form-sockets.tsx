'use client'

import {
    Form as FormComponent,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import submitForm from './actions-socket'
import { useState,useEffect } from 'react'
import { TriangleAlert, SquareCheck } from 'lucide-react'

export const schema = z.object({
    socketNumber: z.string(),
    tableNumber: z.string(),
    areas_id: z.number(),
})

type FormSocketsProps = {
    areas_id: number;
    tableNumber: string;
    maxSockets: number;
}

export type Sockets = {
    socketNumber: string
    state: '關閉' | '開啟' 
    tableNumber: string
    error: string
    reason: string
    solution: string
    broken: number
    areas_id: number
}

const fetchSockets = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    const sockets: Sockets[] = await fetch(`${apiUrl}/api/socket`).then(res => res.json())
    return sockets
}

const FormSockets = ({ areas_id, tableNumber, maxSockets }: FormSocketsProps) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setsuccessMessage] = useState<string | null>(null)

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            socketNumber: '',
            tableNumber: '',
            areas_id: 0,
        },
    })

    useEffect(() => {
        const fetchData = async () => {
            const cookers = await fetchSockets()
            const cookerCount = cookers.filter(socket => socket.areas_id === areas_id).length
            if (cookerCount >= maxSockets) {
                setErrorMessage(`此區域內插座已達上限 (${maxSockets} 個)`)
            } else {
                setErrorMessage(null)
            }
        }

        fetchData()
    }, [areas_id, maxSockets])

    const onSubmit = async (data: z.infer<typeof schema>) => {
        
        if (errorMessage) return;
        setErrorMessage(null)
        setsuccessMessage(null)

        if (data.socketNumber.trim() === '') {
            setErrorMessage("編號不能為空")
            return
        }

        const sockets = await fetchSockets()
        const isDuplicate = sockets.some(socket => socket.socketNumber === data.socketNumber)
        
        if (isDuplicate) {
            setErrorMessage("此編號已存在")
            return
        }

        const submissionData = { ...data, areas_id, tableNumber }
        const result = await submitForm(submissionData)
        console.log(result);
        setsuccessMessage("新增成功")

    }

    return (
        <FormComponent {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="socketNumber"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4 px-4">
                            <FormLabel className='text-base'>請輸入編號 :</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="請輸入插座編號..."
                                    {...field}
                                    className="rounded-md border border-gray-400 px-4 py-2 w-40"
                                />
                            </FormControl>
                            <FormMessage />
                            
                        </FormItem>
                    )}
                />
                <div className='flex justify-between'>
                    <div className='ml-4'>
                        {errorMessage && <div className="text-red-500 flex gap-2 mt-2"><TriangleAlert />{errorMessage}</div>}
                        {successMessage && <div className="text-green-600 flex gap-2 mt-2"><SquareCheck /> {successMessage}</div>}
                    </div>
                    <Button type="submit" className="w-30">儲存</Button>
                </div>
            </form>
        </FormComponent>
    )
}

export default FormSockets
