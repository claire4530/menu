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
import submitForm from './actions-cooker'
import { useState, useEffect } from 'react'
import { TriangleAlert, SquareCheck } from 'lucide-react'

export const schema = z.object({
    cookerNumber: z.string(),
    tableNumber: z.string(),
    areas_id: z.number(),
})

type FormCookersProps = {
    areas_id: number;
    tableNumber: string;
    maxCookers: number;
}

export type Cookers = {
    cookerNumber: string
    state: '關閉' | '開啟' | '錯誤'
    tableNumber: string
    fireStatus: number
    error: string
    reason: string
    solution: string
    broken: number
    areas_id: number
}

const fetchCookers = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    const cookers: Cookers[] = await fetch(`${apiUrl}/api/cooker`).then(res => res.json())
    return cookers
}

const FormCookers = ({ areas_id, tableNumber, maxCookers }: FormCookersProps) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setsuccessMessage] = useState<string | null>(null)

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            cookerNumber: '',
            tableNumber: '',
            areas_id: 0,
        },
    })


    useEffect(() => {
        const fetchData = async () => {
            const cookers = await fetchCookers()
            const cookerCount = cookers.filter(cooker => cooker.areas_id === areas_id).length
            if (cookerCount >= maxCookers) {
                setErrorMessage(`此區域內電磁爐已達上限 (${maxCookers} 台)`)
            } else {
                setErrorMessage(null)
            }
        }

        fetchData()
    }, [areas_id, maxCookers])

    const onSubmit = async (data: z.infer<typeof schema>) => {

        if (errorMessage) return;
        setsuccessMessage(null)
        setErrorMessage(null)

        if (data.cookerNumber.trim() === '') {
            setErrorMessage("編號不能為空")
            return
        }

        const cookers = await fetchCookers()
        const isDuplicate = cookers.some(cooker => cooker.cookerNumber === data.cookerNumber)

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
                    name="cookerNumber"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4 px-4">
                            <FormLabel className='text-base'>請輸入編號 :</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="請輸入電磁爐編號..."
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

export default FormCookers
