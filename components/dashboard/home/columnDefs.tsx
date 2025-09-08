"use client"

import { ComponentWithCategory } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import ActionButtons from "./actionButtons"

export const columns: ColumnDef<ComponentWithCategory>[] = [
  {
    accessorKey: "name",
    header: "Part Number",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => row.original.category?.name
  },
  {
    accessorKey: "quantity",
    header: "Stock Level",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <ActionButtons row={row.original} />
      )
    }
  }
]
