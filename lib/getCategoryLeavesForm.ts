"use server"

import { getCategoryLeaves } from "./db"

export async function getCatLeaves() {
  const categoryData = await getCategoryLeaves()

  // Change these to be the categories
  const categories = categoryData.map(item => ({
    label: item.name,
    value: item.id
  }))

  return (categories)
}
