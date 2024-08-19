import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import fs from 'fs'

export async function POST(req: NextRequest) {
  const data = await req.formData()

  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({  message: 'No file uploaded' })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  await fs.promises.mkdir('public/uploads', { recursive: true })

  const number = Math.floor(Math.random() * 5000) + 1000

  const path = `public/uploads/${number}${file.name}`
  await writeFile(path, buffer)
  
  console.log(`File saved to ${path}`);

  return NextResponse.json({ message: 'File uploaded successfully!', url: `/uploads/${number}${file.name}` })
}
