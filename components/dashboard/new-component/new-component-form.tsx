'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { componentSchema } from "@/lib/zod-schemas"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "react-toastify"
import { ComponentFormFields } from "./component-form-fields"
import { useEffect } from "react"
import { useDebounce } from "use-debounce"

export default function AddNewForm({
  categories
}: {
  categories: {
    label: string;
    value: string;
  }[]
}) {
  const form = useForm<z.infer<typeof componentSchema>>({
    resolver: zodResolver(componentSchema),
    defaultValues: {
      ptNumber: "",
      qty: 0,
      datasheet: "",
      link: "",
      category: "",
      addAnother: true,
    },
    mode: "onBlur"
  })

  const ptNumber = form.watch("ptNumber")
  const [debouncedPtNumber] = useDebounce(ptNumber, 400)

  useEffect(() => {
    if (debouncedPtNumber) {
      form.trigger("ptNumber")
    }
  }, [debouncedPtNumber, form])

  function onSubmit(values: z.infer<typeof componentSchema>) {
    form.reset()
    console.log(values)
    toast.info(
      `${values['ptNumber']} added to stock`,
      {
        autoClose: 3000
      }
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add new component</CardTitle>
        <CardDescription>Enter the details of the new component</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ComponentFormFields categories={categories} form={form} edit={false} />
            <Button className="button-submit w-full" type="submit">Add to stock</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}