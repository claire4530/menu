import Link from 'next/link'
import NavLinks from '@/app/ui/dashboard/nav-links'
import Personalpage from '@/app/ui/acme-logo'
import { PowerIcon } from '@heroicons/react/24/outline'
import { Button } from '@/app/ui/button'
import  RemainingTime  from './remainingTime'
import Notify from './callWaiter'
import CheckoutButton from './check'
interface SideNavProps {
    id: string | string[];  // 定義 id 類型
}
export default function SideNav({ id }: SideNavProps) {

    const decodedId = Array.isArray(id) ? id.map(decodeURIComponent).join(', ') : decodeURIComponent(id);
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-[#f5efe4]">
            <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-[#534D41] py-7 px-4 md:h-28 hover:bg-[#71503e] hover:text-sky-100 w-60 text-white">              
                <Personalpage id={decodedId} />
            </div>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks id={decodedId} />
                <RemainingTime id={decodedId} />
                <Notify id={decodedId} />
                <CheckoutButton id={decodedId}/>
                
                <div className="bg-[#f5efe4] hidden h-auto w-full grow rounded-md md:block"></div>
                {/* <form>
                    <Link href="/">
                        <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-700 hover:text-sky-100 md:flex-none md:justify-start md:p-2 md:px-3">
                            <PowerIcon className="w-6" />
                            <div className="hidden md:block">Sign Out</div>
                        </button>
                    </Link>
                </form> */}
            </div>
        </div>
    )
}
