'use client'
import { useState } from 'react'
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
import submitForm from './actions'
import { TriangleAlert, SquareCheck } from 'lucide-react'

export const schema = z.object({
    name: z.string().refine(value => value !== "", {
        message: '區域名稱不能為空',
    }),
})

interface Areas {
    name: string
}

const fetchTables = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    const areas: Areas[] = await fetch(`${apiUrl}/api/menu`).then(res => res.json())
    return areas
}

const Form = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setsuccessMessage] = useState<string | null>(null)

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setErrorMessage(null)
        setsuccessMessage(null)
        const areas = await fetchTables()
        const isDuplicate = areas.some(area => area.name === data.name)
        
        if (isDuplicate) {
            setErrorMessage("此區域已存在")
            return
        }
        setErrorMessage(null)

        const result = await submitForm(data)
        console.log(result);
        setsuccessMessage("新增成功")
    }

    return (
        <FormComponent {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-7 px-4">
                            <FormLabel>分類名稱 :</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="新增分類名稱"
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
                        {successMessage && <p className="text-green-600 flex gap-2 mt-2"> <SquareCheck /> {successMessage} </p>}
                        {errorMessage && <p className="text-red-500 flex gap-2 mt-2"><TriangleAlert />警告 : {errorMessage}</p>}
                    </div>
                    <Button type="submit" className='ml-4 w-30'>儲存</Button>
                </div>
            </form>
        </FormComponent>
    )
}

export default Form
