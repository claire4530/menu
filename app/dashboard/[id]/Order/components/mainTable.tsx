import * as React from 'react';
import { useReactTable, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, ColumnFiltersState, VisibilityState } from '@tanstack/react-table';
import { ChevronDown, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Invoice } from './types';


interface DataTableProps {
  data: Invoice[];
}

const columns = [
  {
    accessorKey: 'time',
    header: ({ column }: { column: any }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        送出時間
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: { row: any }) => {
      const date = new Date(row.getValue('time'));
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'name',
    header: '品項',
    cell: ({ row }: { row: any }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'money',
    header: '單價',
    cell: ({ row }: { row: any }) => <div>{row.getValue('money')?.toLocaleString()}</div>,
  },
  {
    accessorKey: 'number',
    header: '數量(份)',
    cell: ({ row }: { row: any }) => <div>{row.getValue('number')}</div>,
  },
  {
    accessorKey: 'subtotal',
    header: '小計',
    cell: ({ row }: { row: any }) => {
      const money = row.getValue('money');
      const number = row.getValue('number');
      return <div>{(money * number).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: 'menu_id',
    header: '',
    cell: ({ row }: { row: any }) => <div></div>,
  },
];

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id: 'time', desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
  });

  const handleFilterByMealType = (menu_id: string) => {
    setColumnFilters([
      {
        id: 'menu_id',
        value: menu_id,
      },
    ]);
  };

  const totalSum = React.useMemo(() => {
    return data.reduce((sum, item) => sum + item.money * item.number, 0);
  }, [data]);

  return (
    <div className="w-full">
      <div className="gap-4">     
         <p className="flex text-lg font-bold gap-4 h-10 py-4">訂單編號:</p>       
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="查詢訂單紀錄.."
          value={(table.getColumn('name')?.getFilterValue() as number) ?? ''}
          onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-meal={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  沒有符合條件的訂單
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className=" text-xl font-bold py-4">
          總計: {totalSum.toLocaleString()} 元
      </div>
      <div className="flex items-center justify-end space-x-2 py-4"></div>
    </div>
  );
}

export default DataTable;