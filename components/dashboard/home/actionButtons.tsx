"use client"

import {
  BookOpenIcon,
  PencilSquareIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { ComponentWithCategory, FormCategory } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { componentSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "react-toastify";
import { ComponentFormFields } from "@/components/dashboard/new-component/component-form-fields";
import { Form } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { getCatLeaves } from "@/lib/getCategoryLeavesForm";
import { updateComponentFormSubmit } from "@/lib/server-actions/component-actions";

export default function ActionButtons({
  row,
}: {
  row: ComponentWithCategory
}) {
  const router = useRouter()

  const form = useForm<z.infer<typeof componentSchema>>({
    resolver: zodResolver(componentSchema),
    defaultValues: {
      ptNumber: row.name,
      qty: row.quantity,
      datasheet: "",
      link: "",
      category: row.categoryId
    }
  })

  async function onSubmit(values: z.infer<typeof componentSchema>) {
    setOpen(false)
    console.log(values)
    await updateComponentFormSubmit(values)
    toast.info(
      `${values['ptNumber']} updated`,
      {
        autoClose: 3000
      }
    )
  }

  const [categories, setCategories] = useState<FormCategory[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCatLeaves()
      console.log(data)
      setCategories(data)
    }
    fetchData()
  }, []);

  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-row mr-2 justify-end">
      <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (isOpen) { form.reset() } }}>
        <DialogTrigger asChild>
          <Button className="hover:cursor-pointer" variant={"ghost"}>
            <PencilSquareIcon className="size-7" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]" onInteractOutside={(event) => event.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Edit component</DialogTitle>
            <DialogDescription>
              Make changes to component here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form id="edit-form" onSubmit={form.handleSubmit(onSubmit)}>
              <ComponentFormFields categories={categories} form={form} edit={true} />
            </form>
          </Form>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="button-submit" type="submit" form="edit-form">Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button className="hover:cursor-pointer" variant={"ghost"} onClick={() => router.push(`/dashboard/component/${row.id}`)}>
        <BookOpenIcon className="size-7" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="hover:cursor-pointer" variant={"ghost"}>
            <TrashIcon className="text-red-600 size-7" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete <i><b>{row.name}</b></i> from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}