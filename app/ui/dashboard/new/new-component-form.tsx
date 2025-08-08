'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { componentSchema } from "@/lib/component-schema"
import { z } from "zod"

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Change these to be the categories
const categories = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

export default function AddNewForm() {
  const form = useForm<z.infer<typeof componentSchema>>({
    resolver: zodResolver(componentSchema),
    defaultValues: {
      ptNumber: "",
      link: "",
      addAnother: true,
      category: ""
    }
  })

  function onSubmit(values: z.infer<typeof componentSchema>) {
    form.reset()
    console.log(values)
  }

  return (
    <Card className="w-full md:max-w-[35%]">
      <CardHeader>
        <CardTitle>Add new component</CardTitle>
        <CardDescription>Enter the details of the new component</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="ptNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Component part number</FormLabel>
                  <FormControl>
                    <Input placeholder="Part number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Starting quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Quantity" {...field} onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))} value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link to the product page</FormLabel>
                  <FormControl>
                    <Input placeholder="Link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Component category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find(
                              (category) => category.value === field.value
                            )?.label
                            : "Select category"}
                          <ChevronUpDownIcon className="size-5" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput
                          placeholder="Search category..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                value={category.label}
                                key={category.value}
                                onSelect={() => {
                                  form.setValue("category", category.value)
                                }}
                              >
                                {category.label}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto",
                                    category.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addAnother"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Add another product after submitting</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button className="button-submit" type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}