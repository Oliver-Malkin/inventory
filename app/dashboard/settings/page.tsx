import Categories from "@/components/dashboard/settings/categories/categories";
import CategoryNavBar from "@/components/dashboard/settings/categories/CategoryNavBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const category = (await searchParams).category
  return (
    <main>
      <div className="flex flex-col gap-y-5">
        <CategoryNavBar />
        <Categories categoryId={category} />
      </div>
    </main>
  );
}
