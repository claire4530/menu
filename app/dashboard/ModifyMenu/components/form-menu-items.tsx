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
import submitForm from './actions-menu-items'
import { useState } from 'react'
import { TriangleAlert, SquareCheck } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

export const schema = z.object({
    name: z.string(),
    menu_id: z.number(),
    description: z.string(),
    money: z.string().refine((value) => !isNaN(Number(value)), {
        message: '價錢必須是數字',
    }),
    switchOn: z.boolean(),
    image: z.any(),
})

type FormMenuProps = {
    menu_id: number;
}

export type Menu = {
    name: string
    menu_id: number
    description: string
    money: number
    switchOn: boolean
}

const FormMenu = ({ menu_id }: FormMenuProps) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setsuccessMessage] = useState<string | null>(null)
    const [file, setFile] = useState<File>()

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            menu_id: 0,
            description: "",
            money: "",
            switchOn: true,
            image: [],
        },
    })

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setErrorMessage(null)
        setsuccessMessage(null)
        if (data.name.trim() === '') {
            setErrorMessage("名稱不能為空")
            return
        }

        if (!file) return

        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })
            if (response.ok) {
                const json = await response.json()
                data.image = json.url
            } else {
                setErrorMessage('上傳失敗')
                return
            }
        } catch (error) {
            setErrorMessage('上傳失敗')
            return
        }

        const submissionData = { ...data, menu_id }
        const result = await submitForm(submissionData)
        console.log(result)
        setsuccessMessage("新增成功")

    }

    return (
        <FormComponent {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4 px-4">
                            <FormLabel className='text-base'>請輸入菜品名稱 :</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="請輸入菜品名稱..."
                                    {...field}
                                    className="rounded-md border border-gray-400 px-4 py-2 w-60"
                                />
                            </FormControl>
                            <FormMessage />
                            
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ }) => (
                        <FormItem className="flex items-center gap-4 px-4">
                            <FormLabel className='text-base'>上傳圖片 :</FormLabel>
                            <FormControl>
                                <div className="text-base grid gap-4 justify-right px-4 py-6 h-30 text-black rounded-md hover:bg-slate-100">
                                    <Input
                                        placeholder="Select file"
                                        type="file"
                                        onChange={(e) => setFile(e.target.files?.[0])}
                                        // {...field}
                                        className="rounded-md border border-gray-400 px-4 py-2 w-60"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                            
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4 px-4">
                            <FormLabel className='text-base'>請輸入菜品介紹 :</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="請輸入菜品介紹..."
                                    {...field}
                                    className="rounded-md border border-gray-400 px-4 py-2 w-60"
                                />
                            </FormControl>
                            <FormMessage />
                            
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="money"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4 px-4">
                            <FormLabel className='text-base'>請輸入菜品價錢 :</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="請輸入菜品價錢..."
                                    {...field}
                                    className="rounded-md border border-gray-400 px-4 py-2 w-60"
                                />
                            </FormControl>
                            <FormMessage />
                            
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="switchOn"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-5 px-4">
                            <FormLabel className='text-base'>請輸入菜品是否當季 :</FormLabel>
                            <FormControl>
                                <Switch
                                    id="請輸入菜品是否當季..."
                                    {...field}
                                    value={field.value.toString()}
                                    className=""
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

export default FormMenu
