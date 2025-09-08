import { getComponentById } from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: 'Component Name',
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const componentInfo = await getComponentById(id)
  if (componentInfo !== null) {
    return (
      <div>
        Component info: {JSON.stringify(componentInfo)}
      </div>
    )
  } else {
    notFound()
  }

}