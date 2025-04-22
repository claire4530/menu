import SideNav from '@/app/ui/dashboard/sidenav'
export default function Layout({ children, params }) {
    const { id } = params; // 從 URL 獲取動態參數 guest
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-[#f5efe4]">
            <div className="w-50 flex-none md:w-64">
                <SideNav id={id} />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    )
}