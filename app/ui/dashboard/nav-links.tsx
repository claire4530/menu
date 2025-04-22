'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
    ShoppingCartIcon,
    ClipboardDocumentCheckIcon,
    DocumentDuplicateIcon,
    FireIcon,
  } from '@heroicons/react/24/outline';

interface PersonalpageProps {
    id: string;  // 定義接收的 id 類型
}

export default function NavLinks({ id }: PersonalpageProps) {
    const pathname = usePathname()

    const links = [
        { name: '菜單', href: `/dashboard/${id}/Menu`, icon: DocumentDuplicateIcon },
        { name: '購物車', href: `/dashboard/${id}/ShopCart`, icon: ShoppingCartIcon },
        {
          name: '訂單查詢',
          href: `/dashboard/${id}/Order`,
          icon: ClipboardDocumentCheckIcon,
        },
        { name: '電磁爐控制', href: `/dashboard/${id}/Cooker`, icon: FireIcon }
    ];
    
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-[#71503e] hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-[#f5efe4]': pathname !== link.href,  // 僅當 pathname 不等於 link.href 時使用 bg-gray-50
                                'bg-[#71503e] text-white': pathname === link.href,
                            }
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="font-semibold hidden md:block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}
