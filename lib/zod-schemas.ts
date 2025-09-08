import { z } from "zod"

export const componentSchema = z.object({
  ptNumber: z
    .string()
    .min(1, { message: "Must have a part number" })
    .refine(
      async (ptNumber) => {
        const res = await fetch("/api/component/check-part-number", {
          method: "POST",
          body: JSON.stringify({ ptNumber }),
        });
        const { exists } = await res.json();
        return !exists;
      },
      {
        message: "This part number already exists",
      }
    ),
  qty: z.number().min(0, { message: "Minimum quantity is 0" }),
  datasheet: z.string().optional(),
  link: z.string().optional(),
  category: z.string().min(1, { message: "Category must be selected" }),
  addAnother: z.boolean().optional(),
});

export const categorySchema = z.object({
  name: z.string({ message: "Name is required" }).min(3, { message: "Must be at least 3 characters" })
})