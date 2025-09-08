import { DataTable } from "@/components/ui/dataTable";
import { columns } from "@/components/dashboard/settings/categories/categoryTable/columnDefs";
import { getCategoryByParentId } from "@/lib/db";

export default async function Categories({
  categoryId
}: {
  categoryId: string | undefined
}) {
  let data;
  if (categoryId == undefined) {
    data = await getCategoryByParentId(null);
  } else {
    data = await getCategoryByParentId(categoryId);
  }

  return (
    <DataTable columns={columns} data={data} />
  )
}