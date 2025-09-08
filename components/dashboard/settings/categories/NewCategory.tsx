"use client"

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { categorySchema } from "@/lib/zod-schemas";
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { addCategory } from "@/lib/server-actions/component-actions";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NewCategory({ parentId }: { parentId?: string }) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: ""
    }
  })

  async function onSubmit(values: z.infer<typeof categorySchema>) {
    const result = await addCategory({ name: values.name, parentId: parentId })
    if (result.error) {
      console.log(`Errors!! ${result.error}`)
    } else {
      toast.success("Category created", {
        autoClose: 2000
      })
      setOpen(false)
      form.reset()
    }

  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="button-submit">New <PlusIcon className="size-6" /></Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add new category
            </DialogTitle>
            <DialogDescription asChild>
              {parentId ?
                <p>Create a new child category for: <b><i>{parentId}</i></b></p> :
                <p>Create a new parent category</p>}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} id="category-form">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category Name"{...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"} onClick={() => form.reset()}>Cancel</Button>
            </DialogClose>
            <Button className="button-submit" type="submit" form="category-form">Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}