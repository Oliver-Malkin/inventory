import { z } from "zod"

export const componentSchema = z.object({
  ptNumber: z.string().min(1, { error: "Must have a part number" }),
  qty: z.number().min(0, { error: "Minimum quantity is 0" }),
  datasheet: z.string().optional(),
  link: z.string().optional(),
  addAnother: z.boolean().optional(),
  category: z.string().min(1, { error: "Category must be selected" })
});
