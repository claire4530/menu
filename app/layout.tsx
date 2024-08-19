import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
 
import { ourFileRouter } from "@/app/api/uploadthing/core";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
                {children}
            </body>
        </html>
    )
}
