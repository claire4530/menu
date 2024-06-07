import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentSalesMonth() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        招牌石頭鍋
                    </p>
                    {/* <p className="text-sm text-muted-foreground">
              olivia.martin@email.com
            </p> */}
                </div>
                <div className="ml-auto font-medium">$270</div>
            </div>
            <div className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">蝦仁滑</p>
                    {/* <p className="text-sm text-muted-foreground">jackson.lee@email.com</p> */}
                </div>
                <div className="ml-auto font-medium">$39</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                    <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">燕餃</p>
                    {/* <p className="text-sm text-muted-foreground">
              isabella.nguyen@email.com
            </p> */}
                </div>
                <div className="ml-auto font-medium">$39</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">果汁</p>
                    {/* <p className="text-sm text-muted-foreground">will@email.com</p> */}
                </div>
                <div className="ml-auto font-medium">$39</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/05.png" alt="Avatar" />
                    <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">麵包</p>
                    {/* <p className="text-sm text-muted-foreground">sofia.davis@email.com</p> */}
                </div>
                <div className="ml-auto font-medium">$39</div>
            </div>
        </div>
    )
}
export function RecentSalesDay() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        招牌海鮮鍋
                    </p>
                    {/* <p className="text-sm text-muted-foreground">
              olivia.martin@email.com
            </p> */}
                </div>
                <div className="ml-auto font-medium">$270</div>
            </div>
            <div className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">A5和牛</p>
                    {/* <p className="text-sm text-muted-foreground">jackson.lee@email.com</p> */}
                </div>
                <div className="ml-auto font-medium">$39</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                    <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">蝦仁滑</p>
                    {/* <p className="text-sm text-muted-foreground">
              isabella.nguyen@email.com
            </p> */}
                </div>
                <div className="ml-auto font-medium">$39</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">蝦仁滑</p>
                    {/* <p className="text-sm text-muted-foreground">will@email.com</p> */}
                </div>
                <div className="ml-auto font-medium">$39</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/05.png" alt="Avatar" />
                    <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">蝦仁滑</p>
                    {/* <p className="text-sm text-muted-foreground">sofia.davis@email.com</p> */}
                </div>
                <div className="ml-auto font-medium">$39</div>
            </div>
        </div>
    )
}
export function RecentSalesYear() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        招牌石頭鍋
                    </p>
                    {/* <p className="text-sm text-muted-foreground">
              olivia.martin@email.com
            </p> */}
                </div>
                <div className="ml-auto font-medium">$270</div>
            </div>
            <div className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">蝦仁滑</p>
                    {/* <p className="text-sm text-muted-foreground">jackson.lee@email.com</p> */}
                </div>
                <div className="ml-auto font-medium">$39</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                    <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">蝦仁滑</p>
                    {/* <p className="text-sm text-muted-foreground">
              isabella.nguyen@email.com
            </p> */}
                </div>
                <div className="ml-auto font-medium">$39</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">蝦仁滑</p>
                    {/* <p className="text-sm text-muted-foreground">will@email.com</p> */}
                </div>
                <div className="ml-auto font-medium">$39</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/05.png" alt="Avatar" />
                    <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">蝦仁滑</p>
                    {/* <p className="text-sm text-muted-foreground">sofia.davis@email.com</p> */}
                </div>
                <div className="ml-auto font-medium">$39</div>
            </div>
        </div>
    )
}