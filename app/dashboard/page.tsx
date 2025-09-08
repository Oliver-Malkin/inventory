import { Metadata } from "next";
import { DataTable } from "@/components/ui/dataTable"
import { getComponentsByPage } from "@/lib/db";
import { columns } from "@/components/dashboard/home/columnDefs"

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function ComponentPage() {
  const data = await getComponentsByPage(0, 20)

  return (
    <main>
      <DataTable columns={columns} data={data} />
    </main>
  )
}