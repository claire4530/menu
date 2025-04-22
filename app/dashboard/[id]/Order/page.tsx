// 動態菜單頁面
import {
    ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'
import MainComponent from './components/mainComponent';

interface MenuPageProps {
    params: {
        id: string;
    };
}

export default function MenuPage({ params }: MenuPageProps) {
    const { id } = params; // 從 URL 獲取動態參數 guest
    return (
        <div className="hidden flex-col md:flex">
            <div className='bg-white rounded-3xl p-8 h-auto'>
                <div className="flex h-16 items-center px-4 gap-4">
                    <ClipboardDocumentCheckIcon className="h-8 w-8 font-semibold" />
                    <h2 className="text-3xl font-bold tracking-tight flex-grow">
                        訂單明細
                    </h2>
                    {/* <div className="ml-auto flex items-center space-x-4">
                        <Clean />
                    </div> */}
                </div>
                <div className="border-b p-3"></div>
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <MainComponent id={id} />
                </div>
            </div>
        </div>
    );
}