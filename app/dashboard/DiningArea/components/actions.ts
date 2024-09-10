'use server'

import { z } from 'zod'
import { schema } from './form'

export async function submitForm(data: z.infer<typeof schema>) {
    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const response = await fetch(`${apiUrl}/api/add-reserve`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return response.json()
}
export default submitForm
