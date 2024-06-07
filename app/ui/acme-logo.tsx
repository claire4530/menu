import { UserCircleIcon } from '@heroicons/react/24/outline'
import { lusitana } from '@/app/ui/fonts'

export default function Personalpage() {
    return (
        <div
            className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
        >
            <UserCircleIcon className="h-17 w-17" />
            <p className="text-[33px]">個人頁面</p>
        </div>
    )
}
