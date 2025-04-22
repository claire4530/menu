import { lusitana } from '@/app/ui/fonts'
import { Layers } from 'lucide-react';

interface PersonalpageProps {
    id: string;  // 定義接收的 id 類型
}

export default function Personalpage({ id }: PersonalpageProps) {
    return (
        <div
            className={`${lusitana.className} flex flex-row items-center leading-none text-white gap-2`}
        >
            <Layers className="h-10 w-10"/>
            <p className="text-2xl py-2 font-semibold ">桌號: {id}</p>
        </div>
    )
}
