'use client'
import { Toaster, toast } from 'sonner'
import * as React from 'react'
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    BellAlertIcon,
    BellIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import {CircleGauge} from 'lucide-react'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
import {
AlertDialog,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTitle,
AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const data: Payment[] = [
    {
        state: '已處理',
        event: '電磁爐故障',
        date: '2023-04-20 15:30',
        tableNumber: '第四桌',
        updateSheetMessage: false,
    },
    {
        state: '已處理',
        event: '呼叫服務員',
        date: '2024-05-20 15:30',
        tableNumber: '第三桌',
        updateSheetMessage: false,
    },
    {
        state: '待處理',
        event: '電磁爐故障',
        date: '2024-04-20 15:30',
        tableNumber: '第一桌',
        updateSheetMessage: false,
    },
    {
        state: '待處理',
        event: '電磁爐故障',
        date: '2024-04-20 15:40',
        tableNumber: '第五桌',
        updateSheetMessage: false,
    },
    {
        state: '已處理',
        event: '呼叫服務員',
        date: '2024-04-21 15:30',
        tableNumber: '第三桌',
        updateSheetMessage: false,
    },
    {
        state: '待處理',
        event: '呼叫服務員',
        date: '2024-04-21 10:30',
        tableNumber: '第四桌',
        updateSheetMessage: false,
    },
    {
        state: '待處理',
        event: '呼叫服務員',
        date: '2024-04-21 10:30',
        tableNumber: '第三桌',
        updateSheetMessage: false,
    },
    {
        state: '待處理',
        event: '呼叫服務員',
        date: '2024-04-21 10:30',
        tableNumber: '第十桌',
        updateSheetMessage: false,
    },
    {
        state: '待處理',
        event: '呼叫服務員',
        date: '2024-04-21 10:30',
        tableNumber: '第九桌',
        updateSheetMessage: false,
    },
    {
        state: '待處理',
        event: '呼叫服務員',
        date: '2024-04-21 10:30',
        tableNumber: '第六桌',
        updateSheetMessage: false,
    },
    {
        state: '待處理',
        event: '呼叫服務員',
        date: '2024-04-21 10:30',
        tableNumber: '第七桌',
        updateSheetMessage: false,
    },
]

export type Payment = {
    state: string
    event: string
    date: string
    tableNumber: string
    updateSheetMessage: boolean
}


const handleAddArea = (tableNumber: string, state: string, setSheetMessage: React.Dispatch<React.SetStateAction<string>>) => {
    // 更新 sheetMessage 狀態
    setSheetMessage(prevMessage => {
        const messages = prevMessage.split('\n');
        const newMessage = `${tableNumber}`;
        if (!messages.includes(newMessage)) {
            return prevMessage ? `${prevMessage}\n${newMessage}` : newMessage;
        }
        return prevMessage;
    });
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: 'date',
        header: ({ column }) => {
            return (
                <Button
                    className="ml-4"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    警報時間
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center">
                {row.getValue('state') === '已處理' ? (
                    <>
                        <div className="">{row.getValue('date')}</div>
                    </>
                ) : (
                    <>
                        <div className="">{row.getValue('date')}</div>
                    </>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'state',
        header: '狀態',
        cell: ({ row }) => (
            <div className="flex items-center">
                {row.getValue('state') === '已處理' ? (
                    <>
                        <BellIcon className="mr-2 flex h-6 w-6 " />
                        <span className="">已處理</span>
                    </>
                ) : (
                    <>
                        <BellAlertIcon className="mr-2 flex h-6 w-6 text-red-500" />
                        <span className=" text-red-500">待處理</span>
                    </>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'tableNumber',
        header: '桌號',
        cell: ({ row }) => (
            <div className="flex items-center">
                {row.getValue('state') === '已處理' ? (
                    <>
                        <div>{row.getValue('tableNumber')}</div>
                    </>
                ) : (
                    <>
                        <div className="">{row.getValue('tableNumber')}</div>
                    </>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'event',
        header: '事件',
        cell: ({ row }) => (
            <div className="flex items-center">
                {row.getValue('state') === '已處理' ? (
                    <>
                        <div>{row.getValue('event')}</div>
                    </>
                ) : (
                    <>
                        <div className="">{row.getValue('event')}</div>
                    </>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'state',
        header: () => <div className="ml-4">狀態</div>,
        cell: ({ row, table }) => (
            <div className="flex items-center">
                {row.getValue('state') === '待處理' ? (
                    <>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button
                                    variant="link"
                                    className="h-6 text-red-500"
                                    

                                >
                                    <ExclamationCircleIcon className="mr-2 h-6 w-6 text-red-500" />
                                    前往處理
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='w-[400px] h-[160px]'>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className='text-center'>確定要前往處理嗎?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <div className='flex gap-12 pr-20'>
                                        <AlertDialogCancel>&nbsp;&nbsp;取消&nbsp;&nbsp;</AlertDialogCancel>
                                        <AlertDialogAction 
                                            onClick={() => handleAddArea(row.getValue('tableNumber'), row.getValue('state'), table.options.meta?.updateSheetMessage)}
                                        >
                                            &nbsp;&nbsp;確定&nbsp;&nbsp;
                                        </AlertDialogAction>
                                    </div>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                ) : row.getValue('state') === '已處理' ? (
                    <>
                        <CheckCircleIcon className="ml-4 mr-2 h-6 w-6" />
                        <div>處理完成</div>
                    </>
                ): (
                    <>
                        <div className="flex items-center">
                            <CircleGauge className="mr-2 h-6 w-6 text-yellow-500" />
                            <div className='text-yellow-500'>處理中</div>
                        </div>
                    </>
                )}
            </div>
        ),
    },
]

export function DataTableDemo() {

    
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [sheetMessage, setSheetMessage] = React.useState('')
    
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        meta: {
            updateSheetMessage: setSheetMessage,
        },
    })

    const [showStatusBar, setShowStatusBar] = React.useState(true)
    const [showActivityBar, setShowActivityBar] = React.useState(true)

    return (
        <div className="w-full">
            <div className="flex justify-between items-center py-4">
                <Input
                    placeholder="查詢通知歷史紀錄.."
                    value={
                        (table
                            .getColumn('tableNumber')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('tableNumber')
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className='flex gap-2'>
                    <Sheet>
                        <SheetTrigger>
                            <Button className=''>通知欄</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                            <SheetTitle className='px-4 py-2 items-center'>待處理通知</SheetTitle>
                            <SheetDescription>
                                <ScrollArea className="h-[600px]">
                                    {sheetMessage.split('\n').map((msg, index) => (
                                        <div key={index} >
                                            {msg && 
                                                <div className='grid gap-2 justify-right px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black text-base font-normal '>
                                                    <div className='font-bold text-lg'>
                                                        {msg}
                                                    </div>
                                                    <div className='font-normal'>正在前往{msg}處理中...</div>
                                                    <div className="flex justify-end">
                                                        {msg && <Button className='w-20'>處理完成</Button>}
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    ))}
                                </ScrollArea>
                            </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                狀態選擇
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem
                                checked={showStatusBar}
                                onCheckedChange={setShowStatusBar}
                            >
                                已處理
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={showActivityBar}
                                onCheckedChange={setShowActivityBar}
                            >
                                未處理
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table
                                .getRowModel()
                                .rows.filter((row) => {
                                    const state = row.original.state
                                    return (
                                        (showStatusBar && state === '已處理') ||
                                        (showActivityBar && state === '待處理')
                                    )
                                })
                                .map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && 'selected'
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    沒有此筆訂單名稱
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        上一頁
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        下一頁
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default DataTableDemo
