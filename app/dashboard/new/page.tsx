import AddNewForm from "@/components/dashboard/new-component/new-component-form";
import { getCategoryLeaves } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'New Item',
};

const categoryData = await getCategoryLeaves()

const categories = categoryData.map(item => ({
  label: item.name,
  value: item.id
}))

export default function Dashboard() {
  return (
    <div>
      <AddNewForm categories={categories} />
    </div>
  );
}