"use server"

import z from "zod";
import {
  componentSchema,
  categorySchema,
} from "@/lib/zod-schemas";
import { createCategory } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateComponentFormSubmit(values: z.infer<typeof componentSchema>) {
  console.log(values)
}

export async function addCategory({
  name,
  parentId
}: {
  name: string,
  parentId: string | undefined
}) {
  const parsed = categorySchema.safeParse({
    name: name
  })

  if (!parsed.success) {
    return { error: parsed.error }
  } else {
    await createCategory({ name, parentId })
    console.log(`Created category ${name}`)
    revalidatePath("/dashboard/settings")
    return { success: true }
  }
}
