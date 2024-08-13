"use client";

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
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import { category_url, product_tag_url, vendor_url } from "@/constant/apiUrl";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "photo",
    id: "Photo",
    header: ({ column }) => {
      return <div>Photo</div>;
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {row.original.photos?.map((item) => {
          return (
            <Image
              key={item.id}
              src={item.url}
              height={100}
              width={100}
              alt={row.original.name}
            />
          );
        })}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "SKU",
    header: "SKU",
    cell: ({ row }) => <div className="capitalize">{row.getValue("SKU")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "category.name",
    id: "Kategori",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kategori
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "vendor.name",
    id: "Vendor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vendor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "tags",
    id: "Tags",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tag
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {row.original.tags.map((item, index) => (
          <div
            className="bg-accent px-4 py-2 rounded-md flex items-center justify-between"
            key={item.productId + item.productTagId}
          >
            <p className="mr-2 ">{item.productTag.name}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "minBulkQuantity",
    id: "Min. Bulk Order",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Min Bulk Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.original.minBulkQuantity || "-"}</div>
    ),
  },
  {
    accessorKey: "BulkPrice",
    id: "Bulk Price",
    header: "Bulk Price",
    cell: ({ row }) => (
      <div className="lowercase">{row.original.bulkPrice || "-"}</div>
    ),
  },
  {
    accessorKey: "minStockLevel",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Minimal stock level
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.original.minStockLevel || "-"}</div>
    ),
  },
  {
    accessorKey: "isActive",
    header: () => <div className="text-right">Active</div>,
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("isActive") ? "Yes" : "No"}
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable({ data }: { data: Product[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const productTags = useQuery<Tag[]>({
    queryKey: ["product-tags"],
    queryFn: async () => {
      const res = await fetcher(product_tag_url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (data.success) {
        return data.data;
      }
      throw new Error("Network response was not ok");
    },
  });
  const categories = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetcher(category_url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (data.success) {
        return data.data;
      }
      throw new Error("Network response was not ok");
    },
  });

  const vendors = useQuery<Vendor[]>({
    queryKey: ["vendors"],
    queryFn: async () => {
      const res = await fetcher(vendor_url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (data.success) {
        return data.data;
      }
      throw new Error("Network response was not ok");
    },
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [openCategory, setOpenCategory] = useState(false);
  const [openType, setOpenType] = useState(false);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    Kategori: false,
    Photo: false,
  });

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data,
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

  const selectedItemIds = table.getSelectedRowModel().rows.map((item) => {
    return item.original.id;
  });

  const filterCategory = table
    .getColumn("Kategori")
    ?.getFilterValue() as string;
  const filterVendor = table.getColumn("Vendor")?.getFilterValue() as string;
  return (
    <div className="w-full">
      <div className="flex items-center py-4 flex-wrap">
        <Input
          placeholder="Filter Nama..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {categories.data && (
          <Popover
            open={openCategory}
            onOpenChange={setOpenCategory}
            modal={true}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-[180px] justify-between",
                  filterCategory && "text-muted-foreground"
                )}
              >
                {filterCategory
                  ? categories.data.find(
                      (account) => account.name === filterCategory!
                    )!.name
                  : "Kategori"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Cari..." />
                <CommandEmpty>
                  <p>Tidak ditemukan ...</p>
                </CommandEmpty>
                <CommandGroup className=" max-h-80 overflow-auto">
                  <CommandList>
                    {categories.data.map((account) => (
                      <CommandItem
                        value={account.name}
                        key={account.id}
                        onSelect={(value) => {
                          table.getColumn("Kategori")?.setFilterValue(value);
                          setOpenCategory(false);
                        }}
                      >
                        {`${account.name}`}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}
        {vendors.data && (
          <Popover
            open={openCategory}
            onOpenChange={setOpenCategory}
            modal={true}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-[180px] justify-between",
                  filterVendor && "text-muted-foreground"
                )}
              >
                {filterVendor
                  ? vendors.data.find(
                      (account) => account.name === filterVendor!
                    )!.name
                  : "Kategori"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Cari..." />
                <CommandEmpty>
                  <p>Tidak ditemukan ...</p>
                </CommandEmpty>
                <CommandGroup className=" max-h-80 overflow-auto">
                  <CommandList>
                    {vendors.data.map((vendor) => (
                      <CommandItem
                        value={vendor.name}
                        key={vendor.id}
                        onSelect={(value) => {
                          table.getColumn("vendor.name")?.setFilterValue(value);
                          setOpenCategory(false);
                        }}
                      >
                        {`${vendor.name}`}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Kolom <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border max-[500px]:w-[250px]">
        <Table className="overflow-y-auto relative  ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
